/**
 * This file is for anything Firebase related
 */

/**
 * Add admin Cloud Function
 */
const adminForm = document.querySelector('.admin-actions');
adminForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const adminEmail = document.querySelector('#admin-email').value;
    const addAdmin = functions.httpsCallable('addAdminRole');
    addAdmin({ email: adminEmail }).then(result => {
        console.log(result);
    })
})



/**
 * Listen for auth status changes
 * When you call the onSnapshot method, it returns an object 
 * that you can use to unsubscribe from the listener and prevent the error.
 * param @user
 */
let unsubscribe = () => { };
auth.onAuthStateChanged(user => {
    if (user) { // fires is user is logged in
        user.getIdTokenResult().then(idTokenResult => {
            // console.log(idTokenResult.claims);
            user.admin = idTokenResult.claims.admin; // attaching the admin property to the user temporarily ~ solves issue of log out -log in
            setupUI(user)
        })
        // Get data from Firestore using Realtime listener
        unsubscribe = db.collection('guides').onSnapshot(snapshot => {
            setupGuides(snapshot.docs) // this method is in the index.js file
        })
        console.log('User logged in')
    }
    else {
        setupUI()
        setupGuides([])
        unsubscribe();
        console.log('User logged out');
    }
});

// Create new guide from input
const createForm = document.querySelector('#create-form');

createForm.addEventListener('submit', (e) => {
    e.preventDefault();

    db.collection('guides').add({
        title: createForm['title'].value,
        content: createForm['content'].value
    }).then(() => {
        // Close the modal and reset form
        const modal = document.querySelector('#modal-create')
        M.Modal.getInstance(modal).close()
        createForm.reset();
    }).catch(err => {
        console.log(err.message)
    })
})

// Sign up user
const signupForm = document.querySelector('#signup-form')
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get user info from sign up form
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value

    // Sign up the user via Firebase
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        /**
         * Instead of using the normal add() we use doc() since we want to dictate the ID that would be generated/stored
         * Firebase will check for the users collection. If it doesn't exist, it creates it for you 
         * (however one needs to change the security rules in Firebase to allow the reading and writing of new collections)
         * then we use the set() to add documents into our collections such as: gender, bio, first name, last name
         * 
         * The users collection is created with each document ID being the same as the generated user's ID (cred)
         * upon authentication (sign up). Each document is one user
         */
        return db.collection('users').doc(cred.user.uid).set({
            bio: signupForm['signup-bio'].value
        })
    }).then(() => {
        const modal = document.querySelector('#modal-signup')
        M.Modal.getInstance(modal).close()
        signupForm.reset();
    })
})

// Log out user
const logout = document.querySelector('#logout')
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();

    /**
     * We don't need this since we can now track the status using onAuthStateChanged
     * auth.signOut().then(() => {
        console.log('The user has signed out')
    })
     */
})

// Log in user
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get user info from login form
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    // Log in the user via Firebase
    auth.signInWithEmailAndPassword(email, password).then(cred => {
        // console.log(cred.user)
        // Close login modal and reset the form
        const modal = document.querySelector('#modal-login')
        M.Modal.getInstance(modal).close()
        loginForm.reset();
    })
})

/**
 * 17th May 2020: We edited the Firestore rules to allow creation of the users collection when the user has been
 * authenticated
 * We allowed the reading of the user document info only if the currently logged in user's ID matches the document
 * unique ID ~ meaning, one cannot view information that does not belong to them. One reads only their documents
 */