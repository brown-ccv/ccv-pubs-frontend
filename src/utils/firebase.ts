import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  doc,
  DocumentSnapshot,
  getDocFromCache,
  getDocFromServer,
  updateDoc,
} from 'firebase/firestore';

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

const publicationsDocRef = doc(db, 'production', 'publications');

export const fetchPublicationsData = async () => {
  let docSnap: DocumentSnapshot;

  try {
    docSnap = await getDocFromCache(publicationsDocRef);
  } catch (e) {
    docSnap = await getDocFromServer(publicationsDocRef);
  }

  return docSnap.exists() ? docSnap.data().data : [];
};

export const addPublication = async (newPublication) => {
  const publications = await fetchPublicationsData();
  publications.push(newPublication);

  await updateDoc(publicationsDocRef, {
    data: publications,
  });
};
