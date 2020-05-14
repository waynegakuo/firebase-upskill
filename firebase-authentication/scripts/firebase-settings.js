// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDPEdcMVUgndgYg3O3cUZ2bKdmVkygxC3w",
    authDomain: "fire-auth-tut-70f68.firebaseapp.com",
    databaseURL: "https://fire-auth-tut-70f68.firebaseio.com",
    projectId: "fire-auth-tut-70f68",
    storageBucket: "fire-auth-tut-70f68.appspot.com",
    messagingSenderId: "548948637790",
    appId: "1:548948637790:web:d4801122c7b80ee26e5ccf",
    measurementId: "G-382975M48X"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// Make auth and firestore references
const auth = firebase.auth();
const db = firebase.firestore();