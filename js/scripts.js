//------------------
// Global variables
//------------------
const galleryDiv = document.getElementById('gallery');
const searchContainer = document.getElementsByClassName('search-container');
const userURL = `https://randomuser.me/api/?results=12&nat=au,ca,gb,nl,nz,us`;

//------------------
// Fetch function
//------------------
async function fetchUserData() {

    try {

        const response = await fetch(userURL);
        return await response.json();


    } catch(error) {

        throw error;

    }
  
}

//--------------
// User Cards
//--------------
function generateUserHTML(data) {

    data.map(user => {

        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';

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
        galleryDiv.appendChild(cardDiv);

    });

}

//----------------------
// Generate Modal Window
//----------------------
function modalUserHTML(data) {

    data.map(user => {

        const modalDiv = document.createElement('div');
        modalDiv.className = 'modal-container';

        const birthday = new Date(user.dob.date);

        const modalHTML = `

            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src=${user.picture.large} alt="profile picture">
                    <h3 id="name" class="modal-name cap">${user.name.first} ${user.name.last}</h3>
                    <p class="modal-text">${user.email}</p>
                    <p class="modal-text cap">${user.location.city}</p>
                    <hr>
                    <p class="modal-text">${user.cell}</p>
                    <p class="modal-text">${user.location.street} ${user.location.city} ${user.location.state} 
                    ${user.location.postcode} ${user.nat} </p>
                    <p class="modal-text">${birthday.toLocaleDateString()}</p>
                </div>
            </div>

            <div class="modal-btn-container">
                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
                </div>
            </div>
    
        `;

        modalDiv.innerHTML = modalHTML;
        document.body.insertBefore('modalDiv', document.querySelector('script') );

    })

}





