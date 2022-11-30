import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAPbleT4vXpJ7DdsCFp_RijjhzGd4lRJHs",
  authDomain: "donation-platform-54f2b.firebaseapp.com",
  databaseURL: "https://donation-platform-54f2b-default-rtdb.firebaseio.com",
  projectId: "donation-platform-54f2b",
  storageBucket: "donation-platform-54f2b.appspot.com",
  messagingSenderId: "229918689081",
  appId: "1:229918689081:web:ae5f56b680c524fd128ae8"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export default app;