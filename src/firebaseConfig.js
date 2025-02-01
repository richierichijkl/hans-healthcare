import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAhDXX9icQkYL_Uw_cGYTOqjQGzBIh5wBc",
    authDomain: "sound-bit-446505-k4.firebaseapp.com",
    projectId: "sound-bit-446505-k4",
    storageBucket: "sound-bit-446505-k4.firebasestorage.app",
    messagingSenderId: "961883801137",
    appId: "1:961883801137:web:76bcbf0d36f3a4e1d3f710",
    measurementId: "G-GKH36DJ2FT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); 

export { auth , db};
