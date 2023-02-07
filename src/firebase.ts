// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB9zyYCT52q4DFHhSbfwTjzvvuK2VYJbcM",
  authDomain: "excel-search-22471.firebaseapp.com",
  projectId: "excel-search-22471",
  storageBucket: "excel-search-22471.appspot.com",
  messagingSenderId: "372998369867",
  appId: "1:372998369867:web:26dbf383c665b03fe753ce",
  measurementId: "G-GN6M0F03JK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
