// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyASo7TFvyA361VPJxgvH-31fHelI2vL1Hw",
  authDomain: "chat-app-b32cc.firebaseapp.com",
  projectId: "chat-app-b32cc",
  storageBucket: "chat-app-b32cc.appspot.com",
  messagingSenderId: "497421194952",
  appId: "1:497421194952:web:edff346949b995cd7137fd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();