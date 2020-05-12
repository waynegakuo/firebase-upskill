const my_key = config.MY_KEY;
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: my_key,
    authDomain: "ninja-firestore-tut-5be2a.firebaseapp.com",
    databaseURL: "https://ninja-firestore-tut-5be2a.firebaseio.com",
    projectId: "ninja-firestore-tut-5be2a",
    storageBucket: "ninja-firestore-tut-5be2a.appspot.com",
    messagingSenderId: "176082772838",
    appId: "1:176082772838:web:f3ed971680eabd151ddea7",
    measurementId: "G-05T1WT27BW"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Getting reference to the DB and storing it to a variable -- we will use this variable to interact with the DB
const db = firebase.firestore()

firebase.analytics();