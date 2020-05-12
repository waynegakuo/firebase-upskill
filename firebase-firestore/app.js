const cafeList = document.querySelector('#cafe-list');
let output = '';

// Getting all documents in collection cafes
db.collection('cafes').get()
    .then((snapshot) => {
        // console.log(snapshot.docs)
        snapshot.docs.forEach(doc => {
            // renderCafe(doc)
            output += `
                <li data-id="${doc.id}">
                    <span>${doc.data().name}</span>
                    <span>${doc.data().city}</span>
                </li>`
        })
        cafeList.innerHTML = output
    });


/** 1. Using DOM manipulation to append info from Firebase
 * //  Create elements and render cafe
    function renderCafe(doc) {
        let li = document.createElement('li');
        let name = document.createElement('span')
        let city = document.createElement('span')

        li.setAttribute('data-id', doc.id);
        name.textContent = doc.data().name;
        city.textContent = doc.data().city;

        li.appendChild(name);
        li.appendChild(city);

        cafeList.appendChild(li);
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
