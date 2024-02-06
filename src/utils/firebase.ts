import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithRedirect,
  signOut,
} from 'firebase/auth';
import { getFirestore, doc, setDoc, collection, onSnapshot } from 'firebase/firestore';

import { setPublications, setUser } from '../store/slice/appState';

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

provider.setCustomParameters({
  hd: 'brown.edu',
});

const collectionName = 'publications';

export const handleLogin = async () => {
  try {
    await signInWithRedirect(auth, provider);
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
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { displayName, email } = user;

        dispatch(
          setUser({
            displayName,
            email,
          })
        );
      } else {
        dispatch(
          setUser({
            displayName: '',
            email: '',
          })
        );
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
      collection(db, collectionName),
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
  await setDoc(docRef, publication);
};
