import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAfv8dm_QeuwAKNfzxNZsznqk5xprD9z8w",
  authDomain: "social-media-63987.firebaseapp.com",
  projectId: "social-media-63987",
  storageBucket: "social-media-63987.appspot.com",
  messagingSenderId: "864576852378",
  appId: "1:864576852378:web:235d4918d72df254b5ea23",
  measurementId: "G-D3WY7ZRQMG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// export const storage = getStorage(app);
export const auth = getAuth(app);