
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
const firebaseConfig = {
    apiKey: "AIzaSyCbASeY4ciGe-0d-4DNLHR_0db-U1u9_CI",
    authDomain: "auth-dfff1.firebaseapp.com",
    projectId: "auth-dfff1",
    storageBucket: "auth-dfff1.firebasestorage.app",
    messagingSenderId: "142305291630",
    appId: "1:142305291630:web:ec3f5158b28460a613a57f",
    measurementId: "G-D3M8QV32B8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
console.log("Curent User Data", auth);// just to see details in console 
export const googleProvider = new GoogleAuthProvider();