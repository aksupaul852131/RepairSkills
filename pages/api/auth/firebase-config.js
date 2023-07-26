// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyBQDtkR3sE4_m5fyYhSpxXxpVVWETo8ncE",
//     authDomain: "https://repair-skills.vercel.app",
//     projectId: "wire360b",
//     storageBucket: "wire360b.appspot.com",
//     messagingSenderId: "810263925226",
//     appId: "1:810263925226:web:cd5fcc60513f15987da293",
//     measurementId: "G-4Q77JB357K"
// }; 

const firebaseConfig = {
    // apiKey: "AIzaSyC889DEvp7uJVDzqatqAm-1OIAKqGW5HVQ",
    // authDomain: "hvac-masters-worldwide.firebaseapp.com",
    // projectId: "hvac-masters-worldwide",
    // storageBucket: "hvac-masters-worldwide.appspot.com",
    // messagingSenderId: "1027640520259",
    // appId: "1:1027640520259:web:c7dfaf514fc77739252ef6",
    // measurementId: "G-E0VS11YE41"
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
export { db, storage };
