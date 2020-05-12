const cafeList = document.querySelector('#cafe-list');

// let output = '';

const form = document.querySelector('#add-cafe-form');

//  Create elements and render cafe
const renderCafe = doc => {
    let li = document.createElement('li');
    let name = document.createElement('span')
    let city = document.createElement('span')
    let cross = document.createElement('div')

    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name;
    city.textContent = doc.data().city;
    cross.textContent = 'x'

    li.appendChild(name);
    li.appendChild(city);
    li.appendChild(cross);

    cafeList.appendChild(li);

    // Deleting data
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('cafes').doc(id).delete();
    })
}

/**
 * Getting all documents in collection cafes ~ you can also tag the queries to the order by just appending it before orderBy
 * Throws an error at first if you add where and orderBy so you just click on the link provided on the console to 
 * enable indexing on Firestore ~ resolved it by opening incognito mode since multiple accounts signed in
 * Nested queries is possible ~ Notusing since it's not a real time listener
 */

/**
 * db.collection('cafes').where('city', '==', 'Nairobi').orderBy('name').get()
    .then((snapshot) => {
        // console.log(snapshot.docs)
        snapshot.docs.forEach(doc => {
            renderCafe(doc)
        })
    });
 */

/**
 * Getting data based on a certain query ~ queries are case sensitive where('city', '>', 'M'), where('city', '==', 'M')
 * 
 * db.collection('cafes').where('city', '==', 'Nairobi').get()
    .then((snapshot) => {
        // console.log(snapshot.docs)
        snapshot.docs.forEach(doc => {
            renderCafe(doc)
        })
    });
 */

// Saving data
form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('cafes').add({
        name: form.name.value,
        city: form.city.value
    });
    form.name.value = ''
    form.city.value = ''
})

// Realtime Listener 
db.collection('cafes').orderBy('city').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    // console.log(changes) ~ will show you type whether added or removed
    changes.forEach(change => {
        // console.log(change.doc.data())
        if (change.type == 'added') {
            renderCafe(change.doc);
        }
        else if (change.type == 'removed') {
            // Grab li tag on the page where the data-id attribute equals to that id of the doc that was changed
            let li = cafeList.querySelector("[data-id='" + change.doc.id + "']")
            cafeList.removeChild(li)
        }
    })
})


/** 1. Using DOM manipulation to append info from Firebase ~ this way proves to be stronger then using template literals
 * //  Create elements and render cafe
    function renderCafe(doc) {
        let li = document.createElement('li');
        let name = document.createElement('span')
        let city = document.createElement('span')
        let cross = document.createElement('div')

        li.setAttribute('data-id', doc.id);
        name.textContent = doc.data().name;
        city.textContent = doc.data().city;
        cross.textContent = 'x'

        li.appendChild(name);
        li.appendChild(city);
        li.appendChild(cross);

        cafeList.appendChild(li);

        // Deleting data
        cross.addEventListener('click', (e) => {
            e.stopPropagation();
            let id = e.target.parentElement.getAttribute('data-id');
            db.collection('cafes').doc(id).delete();
        })
    }
 */


/** 2. Using DOM manipulation & template literals to append info from Firebase
 * const cafeList = document.querySelector('#cafe-list');
 * const cafeTemplate = doc => `
        <li data-id="${doc.id}">
            <span>${doc.data().name}</span>
            <span>${doc.data().city}</span>
        </li>`

    // create element & render cafe
    const renderCafe = doc => {
        const li = cafeTemplate(doc)
        cafeList.insertAdjacentHTML("beforeend", li)
    }
 */

/**
 * const renderCafe = doc => {
    output += `
    <li data-id="${doc.id}">
        <span>${doc.data().name}</span>
        <span>${doc.data().city}</span>
        <div id="delete">x</div>
    </li>`

    cafeList.innerHTML = output

    // Deleting data when 'x' is clicked
    let cross = document.querySelector('div'); // Getting the DOM properties for the div with the 'x' symbol ~ proving problematic when clicking --> probably has to do with using innerHTML instead of appendChild
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id'); // getting the cross(e.target), move to the parent element (which is the li) then get the unique ID inside 'data-id' of the element li
        db.collection('cafes').doc(id).delete();
    })
}
 */