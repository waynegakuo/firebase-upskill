/**
 * This file is used for manipulating the DOM
 */

const guideList = document.querySelector('.guides');

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