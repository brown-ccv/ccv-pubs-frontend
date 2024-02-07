import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  onSnapshot,
  query,
  limit,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { formatISO } from 'date-fns';

import { setPublications } from '../store/slice/appState';

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

const collectionName = 'publications';

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
        limit(10) // TODO: TEMPORARY. Limiting right now. Set up pagination?
      ),
      (snapshot) => {
        const publications = snapshot.docs.map((doc) => {
          const data = doc.data();

          return {
            ...data,

            // Note: Needed to convert Timestamp type to a serializable type like a string
            // Also, formatISO gives the date in ISO format in local time zone by default
            updatedAt: formatISO(data.updatedAt.toDate()),
          };
        });
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

    // Firestore automatically replaces serverTimestamp with the server's timestamp
    // when the data is written to the database
    updatedAt: serverTimestamp(),
  });
};
