// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBQDtkR3sE4_m5fyYhSpxXxpVVWETo8ncE",
    authDomain: "wire360b.firebaseapp.com",
    projectId: "wire360b",
    storageBucket: "wire360b.appspot.com",
    messagingSenderId: "810263925226",
    appId: "1:810263925226:web:cd5fcc60513f15987da293",
    measurementId: "G-4Q77JB357K"
};



// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export default app;
export { db, storage };
