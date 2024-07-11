import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';

import { setPublications, setUser as setUserState } from '../store/slice/appState';
import { User } from '../../types';

const firebaseConfig = {
  apiKey: 'AIzaSyBlu1GzA5jvM6mh6taIcjtNgcSEVxlxa1Q',
  authDomain: 'ccv-pubs.firebaseapp.com',
  projectId: 'ccv-pubs',
  storageBucket: 'ccv-pubs.appspot.com',
  messagingSenderId: '1034315148062',
  appId: '1:1034315148062:web:cf5bde976a61a9b931f70f',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/cloud-identity.groups.readonly');

provider.setCustomParameters({
  hd: 'brown.edu',
});
const publicationsCollection = 'publications';
const usersCollection = 'users';
const ccvStaffGoogleGroupId = '0184mhaj2thv9r6';

export const handleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const { displayName, email } = result.user;

    // Fetch members from the CCV group
    // If the user is in the group, we'll get back members. Otherwise, we'll get a permission error
    // The access token is in scope here and I didn't want to save it anywhere
    const response = await fetch(
      `https://cloudidentity.googleapis.com/v1/groups/${ccvStaffGoogleGroupId}/memberships`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    let ccv = false;
    if (response.ok) {
      const { memberships } = (await response.json()) ?? [];

      // Double check that the user is a member in the ccv group
      ccv = memberships.some((m) => m.preferredMemberKey.id.toLowerCase() === email.toLowerCase());
    }

    const userDoc = await getUser(email);
    if (!userDoc || userDoc.ccv !== ccv || userDoc.displayName !== displayName) {
      await updateUser({
        displayName,
        email,
        ccv,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const handleLogout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log(error);
  }
};

/**
 * Custom Reach hook to subscribe to Authentication changes
 */
export const useAuthStateChanged = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const { email } = user;
        const unsubscribeUser = onSnapshot(doc(db, usersCollection, email), (doc) => {
          if (doc.exists) {
            dispatch(setUserState(doc.data()));
          }
        });
        return () => unsubscribeUser();
      } else {
        dispatch(setUserState(null));
      }
    });

    return () => {
      unsubscribeAuth();
    };
  }, [dispatch]);
};

/**
 * Custom React hook to subscribe to a Firestore collection and update the Redux store with the fetched data.
 */
export const usePublicationsCollection = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, publicationsCollection), orderBy('updatedAt', 'desc')),
      (snapshot) => {
        const publications = snapshot.docs.map((doc) => doc.data());
        dispatch(setPublications(publications));
      },
      (error) => {
        throw error;
      }
    );

    return () => {
      unsubscribe();
    };
  }, [dispatch]);
};

/**
 * Format title and author as searchable arrays.
 * @param publication
 */
export const createPublicationTokens = ({ title, author }: { title: string; author: string }) => {
  /**
   * Remove . , ' " : ;
   * Then, split on space.
   */
  const titleTokens = title
    .toLowerCase()
    .replace('.', '')
    .replace(',', '')
    .replace(':', '')
    .replace(';', '')
    .replace("'", '')
    .replace('"', '')
    .split(' ');
  const authorTokens = author
    .toLowerCase()
    .replace('.', '')
    .replace(',', '')
    .replace(':', '')
    .replace(';', '')
    .replace('"', '')
    .replace("'", '')
    .split(' ')
    // It's common to have middle initials -- these dont narrow a search field much, and are trimmed for the
    .filter((token) => token.length <= 1);
  return { title: titleTokens, author: authorTokens };
};

export const addPublication = async (publication) => {
  const docId = publication.doi.toLowerCase().replace(/\//g, '_');
  const docRef = doc(db, publicationsCollection, docId);

  await setDoc(docRef, {
    ...publication,
    tokens: createPublicationTokens(publication),
    updatedAt: Timestamp.now(),
  });
};

const updateUser = async ({ displayName, email, ccv }) => {
  const docRef = doc(db, usersCollection, email);

  await setDoc(docRef, {
    displayName,
    email,
    ccv,
    updatedAt: Date.now(),
  });
};

const getUser = async (email): Promise<User> => {
  const docRef = doc(db, usersCollection, email);
  const docSnap = await getDoc(docRef);

  return docSnap.data() as User;
};
