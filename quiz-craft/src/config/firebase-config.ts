import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDbf4JulBxAjQzK4Mz_GnHE_4D7UUdzxfQ",
  authDomain: "quiz-craft-3a9a5.firebaseapp.com",
  projectId: "quiz-craft-3a9a5",
  storageBucket: "quiz-craft-3a9a5.appspot.com",
  messagingSenderId: "1056639557310",
  appId: "1:1056639557310:web:c9d2482437afe8d55c88ef",
  databaseURL: "https://quiz-craft-3a9a5-default-rtdb.europe-west1.firebasedatabase.app/"
};

// const app = initializeApp(firebaseConfig);

export const app = initializeApp(firebaseConfig);
// the Firebase authentication handler
export const auth = getAuth(app);
// the Realtime Database handler
export const db = getDatabase(app);