import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC0p6gRxuKVy9S1yeo0y57LRKmNasYlWpw",
    authDomain: "sampleproject-f6866.firebaseapp.com",
    projectId: "sampleproject-f6866",
    storageBucket: "sampleproject-f6866.firebasestorage.app",
    messagingSenderId: "505989367053",
    appId: "1:505989367053:web:82723e8ded135b02265c44",
    measurementId: "G-7RQJ4NX9DD"
};

const app = initializeApp(firebaseConfig);
console.log("Firebase connected:", app);
export default app;
