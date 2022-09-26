import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUFWWupzklQXY6FMNJy2g1LTT7qAjmYGg",
  authDomain: "notes-app-39d20.firebaseapp.com",
  projectId: "notes-app-39d20",
  storageBucket: "notes-app-39d20.appspot.com",
  messagingSenderId: "174117911193",
  appId: "1:174117911193:web:edf2d0f5b8ecfcf4fa1608"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);