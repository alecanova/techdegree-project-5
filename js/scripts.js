//------------------
// Global variables
//------------------
const galleryDiv = document.getElementById('gallery');
const searchContainer = document.getElementsByClassName('search-container');

//------------------
// Fetch function
//------------------
function fetchUserData(url) {

    return fetch(url) 

        .then(response => response.json() )
        .then(data => data.results)
        .catch(error => console.log('Looks like there was a problem.', error))

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
                <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
            </div>
            
        `;

        cardDiv.innerHTML = userHTML;
        galleryDiv.appendChild(cardDiv);

    });

}