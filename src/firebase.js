// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0PlYtiK8o_zIQyteN2Za1FxxzZKfMk6A",
  authDomain: "talkmatereact.firebaseapp.com",
  projectId: "talkmatereact",
  storageBucket: "talkmatereact.appspot.com",
  messagingSenderId: "966434316985",
  appId: "1:966434316985:web:97c57d94b8727a65537168",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
