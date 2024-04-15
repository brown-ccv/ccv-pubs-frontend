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
  limit,
  orderBy,
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
const collectionName = 'publications';

export const handleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const { email } = result.user;

    const response = await fetch(
      `https://cloudidentity.googleapis.com/v1/groups/0184mhaj2thv9r6/memberships`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    let ccv = false;
    if (response.ok) {
      const { memberships } = (await response.json()) ?? [];
      ccv = memberships.some((m) => m.preferredMemberKey.id.toLowerCase() === email.toLowerCase());
    }

    const userDoc = await getUser(email);
    if (!userDoc || userDoc.ccv !== ccv) {
      userDoc.ccv = ccv;
      await updateUser(userDoc);
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
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const { email } = user;
        const userData = await getUser(email);
        console.log(userData);
        dispatch(setUserState(userData));
      } else {
        dispatch(setUserState(null));
      }
    });

    return () => {
      unsubscribe();
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
      query(
        collection(db, collectionName),
        orderBy('updatedAt', 'desc'),
        limit(100) // TODO: TEMPORARY. Limiting right now. Set up pagination?
      ),
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

export const addPublication = async (publication) => {
  const docId = publication.doi.toLowerCase().replace(/\//g, '_');
  const docRef = doc(db, collectionName, docId);

  await setDoc(docRef, {
    ...publication,
    updatedAt: Date.now(),
  });
};

const updateUser = async ({ displayName, email, ccv }: User) => {
  const docRef = doc(db, 'users', email);

  await setDoc(docRef, {
    displayName,
    email,
    ccv,
    updatedAt: Date.now(),
  });
};

const getUser = async (email): Promise<User> => {
  const docRef = doc(db, 'users', email);
  const docSnap = await getDoc(docRef);

  return docSnap.data() as User;
};
