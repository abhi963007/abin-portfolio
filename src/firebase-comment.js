import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBXzTjhdjy71pN2zEn_C_zIcbyHwz0KZnM",
    authDomain: "portfolio-db-ea02f.firebaseapp.com",
    projectId: "portfolio-db-ea02f",
    storageBucket: "portfolio-db-ea02f.firebasestorage.app",
    messagingSenderId: "912619057498",
    appId: "1:912619057498:web:843481a5f5195ca5b6c363",
    measurementId: "G-18R2RKJHST"
};

// Initialize with a unique name
const app = initializeApp(firebaseConfig, 'comments-app');
const db = getFirestore(app);

export { db, collection, addDoc };