// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGSJFRpSe1eslC9jX5JXpti-y1lCxQRoY",
  authDomain: "clone-8cd5d.firebaseapp.com",
  projectId: "clone-8cd5d",
  storageBucket: "clone-8cd5d.appspot.com",
  messagingSenderId: "1073511703206",
  appId: "1:1073511703206:web:142ae862d19938c40eca67",
  measurementId: "G-4LRELZ4NGD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const db = getFirestore(app);

// Export for use in other files
export { auth, db };

