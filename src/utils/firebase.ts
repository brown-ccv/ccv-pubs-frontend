import { initializeApp } from "firebase/app"
import { getFirestore, doc, DocumentSnapshot, getDocFromCache, getDocFromServer } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBlu1GzA5jvM6mh6taIcjtNgcSEVxlxa1Q",
  authDomain: "ccv-pubs.firebaseapp.com",
  projectId: "ccv-pubs",
  storageBucket: "ccv-pubs.appspot.com",
  messagingSenderId: "1034315148062",
  appId: "1:1034315148062:web:cf5bde976a61a9b931f70f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const fetchPublicationsData = async () => {
  const docRef = doc(db, "production", "publications");
  let docSnap: DocumentSnapshot;

  try {
    docSnap = await getDocFromCache(docRef);
  } catch (e) {
    docSnap = await getDocFromServer(docRef);
  }

  return docSnap.exists() ? docSnap.data().data : [];
}