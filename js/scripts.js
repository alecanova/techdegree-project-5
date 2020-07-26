//------------------
// Global variables
//------------------
const gallery = document.getElementById('gallery');
const userCardArr = [];

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

const generateCard = (users) => {

    users.map( user => {

        const userCard = 

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

        `;

        userCardArr.push(userCard);

    })

    userCardArr.forEach(profile => {

        gallery.innerHTML += profile;
            
    })

        // Insert event click to open modal here
    const cards = document.querySelectorAll('.card');

        for (let i = 0; i < cards.length; i++) {
        
            cards[i].addEventListener('click', event => {

                if (event.target === cards[i] || cards[i].contains(event.target) ) {

                    generateModalWindow(users, i);

                }

            })

         }

}

//------------------
// Show Modal Window
//------------------
const generateModalWindow = (users, index) => {

    const user = users[index];

        const modalContainer = document.createElement('div');
        modalContainer.classList.add('modal-container');

        const birthday = new Date(user.dob.date);

        modalContainer.innerHTML = `

        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${user.picture.large}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${user.name.first} ${user.name.last}</h3>
                <p class="modal-text">${user.email}</p>
                <p class="modal-text cap">${user.location.country}</p>
                <hr>
                <p class="modal-text">${user.cell}</p>
                <p class="modal-text">${user.location.street.number} ${user.location.street.name}
                ${user.location.city}, ${user.location.state}, ${user.nat}</p>
                <p class="modal-text">Birthday: ${birthday.toLocaleDateString()}</p>
            </div>
        </div>
        
        `;

        document.body.insertBefore(modalContainer, document.querySelector('script'));

    const modalCloseBtn = document.getElementById('modal-close-btn');
    modalContainer.addEventListener('click', event => {

        if(event.target === modalCloseBtn || modalCloseBtn.contains(event.target)) {

            modalContainer.remove();

        }

    })

}




//-----------
// Fetch Data
//-----------
fetchData('https://randomuser.me/api/?results=12&nat=au,ca,gb,nl,nz,us')

    .then(data => {

        generateCard(data);

    })


    