import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyBMOPIy-DDawOtn5MNq5DfQzlFty4ET5iE",
    authDomain: "duelmonster-23394.firebaseapp.com",
    projectId: "duelmonster-23394",
    storageBucket: "duelmonster-23394.appspot.com",
    messagingSenderId: "939816002952",
    appId: "1:939816002952:web:e0727e924399c45fc5063d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const auth = getAuth(app)
export const db = getFirestore(app)