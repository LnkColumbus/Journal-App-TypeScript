// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWAGE0DiD-z8sa807eOVqJXmxWBfxFjAs",
  authDomain: "react-app-cursos-688bf.firebaseapp.com",
  projectId: "react-app-cursos-688bf",
  storageBucket: "react-app-cursos-688bf.appspot.com",
  messagingSenderId: "465679875248",
  appId: "1:465679875248:web:3881176af7617b8eaecf75"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB = getFirestore( FirebaseApp );