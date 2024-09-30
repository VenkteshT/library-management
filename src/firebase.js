import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBedvOgu8FJnyqadnqVyMc7tUpWywzZRQA",
  authDomain: "library-management-f836a.firebaseapp.com",
  projectId: "library-management-f836a",
  storageBucket: "library-management-f836a.appspot.com",
  messagingSenderId: "793398490712",
  appId: "1:793398490712:web:50650f623b4ab90e107c2d",
  measurementId: "G-V4PSPDSTZH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Authentication
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Initialize Storage
const storage = getStorage(app);

export { auth, provider, storage };
export default db;
