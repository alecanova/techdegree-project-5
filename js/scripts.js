//------------------
// Global variables
//------------------
const galleryDiv = document.getElementById('gallery');
const searchContainer = document.getElementsByClassName('search-container');
//const userURL = `https://randomuser.me/api/?results=12&nat=au,ca,gb,nl,nz,us`;

//------------------
// Fetch function
//------------------
function fetchUserData(url) {

    return fetch(url)

        .then((response) => response.json()) 
        .then((data) => data.results)
        .catch((error) => console.log('Looks like there was a problem', error))
  
}



//----------------------
// Generate Modal Window
//----------------------
function generateModalHTML(user) {

    const birthday = new Date(user.dob.date);

    return `

        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">

                <img class="modal-img" src=${user.picture.large} alt="profile picture">
                <h3 id="name" class="modal-name cap">${user.name.first} ${user.name.last}</h3>
                <p class="modal-text">${user.email}</p>
                <p class="modal-text cap">${user.location.city}</p>
                <hr>
                <p class="modal-text">${user.cell}</p>
                <p class="modal-text">${user.location.street.number} ${user.location.street.name} ${user.location.city}, 
                ${user.location.state}, ${user.nat}, ${user.location.postcode}</p>
                <p class="modal-text">Birthday: ${birthday.toLocaleDateString()}</p>
            </div>
        </div>

    `;

}

// Create modal Window
function generateModalWindow(user, data) {

    const modalDiv = document.createElement('div');
    modalDiv.setAttribute('class','modal-container');
    document.body.insertBefore( modalDiv, document.querySelector('script') );
    modalDiv.innerHTML = generateModalHTML(user);

    modalButton(user, data);

}

// Modal Buttons
function modalButton(user, data) {

    const btnContainer = document.createElement('div');
    btnContainer.setAttribute('class','modal-btn-container');

    const modal = document.querySelector('.modal');
    modal.appendChild(btnContainer);

    btnContainer.innerHTML = `

        <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
        <button type="button" id="modal-next" class="modal-next btn">Next</button>

    `;

    const prevButton = document.getElementById('modal-prev');
    const nextButton = document.getElementById('modal-next');

    let userIndex = data.indexOf(user);

    nextButton.addEventListener('click', () => {

        if(userIndex < data.length -1) {

            modal.style.display = 'none';
            generateModalWindow( data[userIndex +1], data );
            userIndex++;

        }

    });

    prevButton.addEventListener('click', () => {

        if(userIndex > 0) {

            modal.style.display = 'none';
            generateModalWindow( data[userIndex -1], data );
            userIndex--;
        }
    });

    
        
    document.getElementById('modal-close-btn').addEventListener('click', (e) => {

        e.target = document.querySelector('.modal-container').style.display = 'none';

    }) 

}

//-------------------
// Generate User Card
//-------------------
function generateUserHTML(user, data) {

    const cardDiv = document.createElement('div');
    cardDiv.setAttribute('class', 'card'); 
    galleryDiv.appendChild(cardDiv);

    const userHTML = `
        
        <div class="card-img-container">
            <img class="card-img" src=${user.picture.medium} alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
            <p class="card-text">${user.email}</p>
            <p class="card-text cap">${user.location.city}, ${user.location.country}</p>
        </div>

    `;

    cardDiv.innerHTML = userHTML;

    cardDiv.addEventListener('click', (e) => {

        e.target = generateModalWindow(user, data);

    });

}

//Fetching app
fetchUserData('https://randomuser.me/api/?results=12&nat=au,ca,gb,nl,nz,us')

    .then( data => {

        data.map(user => {

            generateUserHTML(user, data)

        })

    })

    

    


