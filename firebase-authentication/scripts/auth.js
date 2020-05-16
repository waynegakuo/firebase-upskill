// Listen for auth status changes
auth.onAuthStateChanged(user => {
    if (user) { // fires is user is logged in
        // Get data from Firestore
        db.collection('guides').get().then(snapshot => {
            setupGuides(snapshot.docs) // this method is in the index.js file
        })
        console.log('User logged in: ', user);
    }
    else {
        setupGuides([])
        console.log('User logged out');
    }
});

// Sign up user
const signupForm = document.querySelector('#signup-form')
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get user info from sign up form
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value

    // Sign up the user via Firebase
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
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