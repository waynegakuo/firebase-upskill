// Sign up
const signupForm = document.querySelector('#signup-form')
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get user info from sign up form
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value

    // Sign up the user via Firebase
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        console.log(cred.user)
        const modal = document.querySelector('#modal-signup')
        M.Modal.getInstance(modal).close()
        signupForm.reset();
    })
})