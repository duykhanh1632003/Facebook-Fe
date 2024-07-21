// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_Assr5-SkyXvkLMJ0r9_dWYrQxmp10sM",
  authDomain: "project-8eefd.firebaseapp.com",
  projectId: "project-8eefd",
  storageBucket: "project-8eefd.appspot.com",
  messagingSenderId: "1044264998302",
  appId: "1:1044264998302:web:e26b1b593b4b905777728f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const imageDb = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
