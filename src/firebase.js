import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQsGKUr0MyanLL8K7ehqma-XYNeBsErsA",
  authDomain: "photobooth-ce6af.firebaseapp.com",
  projectId: "photobooth-ce6af",
  storageBucket: "photobooth-ce6af.firebasestorage.app",
  messagingSenderId: "33699134189",
  appId: "1:33699134189:web:32eb7e0b20399f1fdf6ae4",
  measurementId: "G-9S42W57WN5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);