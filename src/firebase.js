// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC58u_FvbXvCPRLsE5vphv6ypKf_sAH9-k",
    authDomain: "my-dictionary-4da74.firebaseapp.com",
    projectId: "my-dictionary-4da74",
    storageBucket: "my-dictionary-4da74.appspot.com",
    messagingSenderId: "1075981129014",
    appId: "1:1075981129014:web:b40bb2f70eef6ef9a6cf97",
    measurementId: "G-XP5P07TBMM"
  };

initializeApp(firebaseConfig);
// Initialize Firebase
// const app = initializeApp(firebaseConfig);

export const db = getFirestore();