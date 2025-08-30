import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
   apiKey: "AIzaSyDsdPD5qw0yIgwjx8B_xAL_CtLcs8upTUI",
    authDomain: "mobile-app-373de.firebaseapp.com",
    projectId: "mobile-app-373de",
    storageBucket: "mobile-app-373de.firebasestorage.app",
    messagingSenderId: "899137427687",
    appId: "1:899137427687:web:d07737e91d87bef6db6a42",
    measurementId: "G-KKPJDFP4TP"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

