/**
 * This file is used for manipulating the DOM
 */

const guideList = document.querySelector('.guides');

// Getting access to DOM elements for showing/hiding based on authentication
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');

// Reference to the account pop-up
const accountDetails = document.querySelector('.account-details')

// Reference to admin section
const adminItems = document.querySelectorAll('.admin');

// Checks if the user exists/logged in, and also checks if the user logged in is an admin ~ gets called in the auth.js
const setupUI = (user) => {
    if (user) {
        if (user.admin) {
            // Display admin items if the user logged in has the admin property (if is an admin)
            adminItems.forEach(item => item.style.display = 'block')
        }
        // Show account info & use the user's unique id to query the firestore for a specific document in a specific collection
        db.collection('users').doc(user.uid).get().then(doc => {
            const html = `
            <div>Logged in as ${user.email}</div>
            <div>${doc.data().bio}</div>
            <div class="pink-text">${user.admin ? 'Admin': ''}</div>
        `;
            accountDetails.innerHTML = html;
        })
        // Toggle UI elements
        loggedInLinks.forEach(item => item.style.display = 'block');
        loggedOutLinks.forEach(item => item.style.display = 'none');
    }
    else {
        // Hide admin items
        adminItems.forEach(item => item.style.display = 'none')
        // Hide account info
        accountDetails.innerHTML = '';
        // Toggle UI elements
        loggedInLinks.forEach(item => item.style.display = 'none');
        loggedOutLinks.forEach(item => item.style.display = 'block');
    }
}

/**
 * Set up guides 
 * will take in data from auth.js method of getting data from the firestore collection 
 * and cycle through and output a guide for each element inside that data array
 */
const setupGuides = (data) => {

    // if we have length, then we output
    if (data.length) {
        let html = '';
        data.forEach(doc => {
            const guide = doc.data();
            const li = `
        <li>
            <div class="collapsible-header grey lighten-4">${guide.title}</div>
            <div class="collapsible-body white">${guide.content}</div>
        </li>
        `;

            html += li;
        });

        guideList.innerHTML = html;
    }

    //if we don't have the length, instead of showing nothing, we show some information
    else {
        guideList.innerHTML = '<h5 class="center-align">Login to view guides</h5>'
    }
}

// setup materialize components
document.addEventListener('DOMContentLoaded', function () {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);

});