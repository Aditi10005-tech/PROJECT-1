const firebaseConfig = {
    apiKey: "AIzaSyAmmKZR7vMeC1ntsGp9wUlwVzqRHyqbi-E",
    authDomain: "login-system-70a40.firebaseapp.com",
    databaseURL: "https://login-system-70a40-default-rtdb.firebaseio.com",
    projectId: "login-system-70a40",
    storageBucket: "login-system-70a40.appspot.com",
    messagingSenderId: "1084131386016",
    appId: "1:1084131386016:web:6087163760124e6375249d"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth(app);
const database = firebase.database(app);