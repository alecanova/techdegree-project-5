//------------------
// Global variables
//------------------
const gallery = document.getElementById('gallery');

//---------------
// Fetch function
//---------------
function fetchData(url) {

    return fetch(url)

        .then(response => response.json() )
        .then(data => data.results )
        .catch(error => console.log('Looks like there was a problem', error))

  }

//------------------------
// Generate User Card HTML
//------------------------

function generateCardHTML(data) {

    const cards = data.map( user => 

        `
        <div class="card">
            <div class="card-img-container">
                <img class="card-img" src=${user.picture.medium} alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last} </h3>
                <p class="card-text">${user.email}</p>
                <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
            </div>
        </div>

        `

    );

        gallery.innerHTML = cards;

}

fetchData('https://randomuser.me/api/?results=12&nat=au,ca,gb,nl,nz,us')

    .then(data => {

        data.results;
        generateCardHTML(data);
        
    })

    
    