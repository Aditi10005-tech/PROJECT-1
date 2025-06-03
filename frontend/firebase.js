const firebaseConfig = {
    apiKey: "AIzaSyB1l911q111111111111111111111111111111111",
    authDomain: "login-system-70a40.firebaseapp.com",
    databaseURL: "https://login-system-70a40-default-rtdb.firebaseio.com",
    projectId: "login-system-70a40",
    storageBucket: "login-system-70a40.appspot.com",
    messagingSenderId: "1234567890",
    appId: "1:1234567890:web:1234567890abcdef123456"
};

// Initialize Firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { getDatabase, ref, set, get, child, update } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js';

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase();

// Export Firebase services
export { auth, database, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, ref, set, get, child, update };
