// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider, PhoneAuthProvider } from 'firebase/auth'
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyArPKKxuAfJ7rQlKkFH1or0lt2s8em67cA",
  authDomain: "heavyvehicle-872d8.firebaseapp.com",
  projectId: "heavyvehicle-872d8",
  storageBucket: "heavyvehicle-872d8.appspot.com",
  messagingSenderId: "44177873512",
  appId: "1:44177873512:web:10ed32a0594a184e1039dd",
  measurementId: "G-EMYQ9EFL23"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const phoneProvider = new PhoneAuthProvider()
