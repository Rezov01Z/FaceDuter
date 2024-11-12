
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "pblreal-time.firebaseapp.com",
  projectId: "pblreal-time",
  storageBucket: "pblreal-time.appspot.com",
  messagingSenderId: "609332081727",
  appId: "1:609332081727:web:943389016644ec7b76748a"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();