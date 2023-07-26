// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyC889DEvp7uJVDzqatqAm-1OIAKqGW5HVQ",
    authDomain: "hvac-masters-worldwide.firebaseapp.com",
    projectId: "hvac-masters-worldwide",
    storageBucket: "hvac-masters-worldwide.appspot.com",
    messagingSenderId: "1027640520259",
    appId: "1:1027640520259:web:443bdc172f094235252ef6",
    measurementId: "G-MC8P4BL5KN"
};



// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export default app;
export { db, storage, app };
