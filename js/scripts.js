//------------------
// Select global variables
//------------------
const gallery = document.getElementById('gallery');
const searchContainer = document.querySelector('.search-container');
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

//------------------
// Create search bar
//------------------

const createSearchBar = () => {

    // Create the form element
    const form = document.createElement('form');
    form.id = 'search-form';

    // Create the input element
    const input = document.createElement('input');
	input.setAttribute('type', 'search');
    input.setAttribute('id', 'search-input');
    input.setAttribute('class', 'search-input');
    input.placeholder = 'Search...';
    
    form.appendChild(input);

    // Create the search button
    const searchBtn = document.createElement('button');
    searchBtn.setAttribute('type', 'search');
    searchBtn.setAttribute('class', 'search-submit');
	searchBtn.textContent = 'search';
    form.appendChild(searchBtn);
    
    searchContainer.appendChild(form);

    // Add a submit event to the 'search' button.
    searchBtn.addEventListener('submit', event => {

        event.preventDefault();
        searchResult();

    });

    // Add a keyup event to the search input.
    input.addEventListener('keyup', event => {

        event.preventDefault();
        searchResult();

    });

}


//--------------------
// Show search results
//--------------------

// Filter the directory by employee name
const searchResult = () => {

    const cards = document.querySelectorAll('.card');
    const name = document.getElementById('search-input').value.toLowerCase();

        cards.forEach(card => {

            const cardName = card
            .getElementsByClassName('card-name')[0]
            .innerHTML.toLowerCase(); 

                if(cardName.includes(name) ) {

                    card.style.display = '';
                   
                } else  {

                    card.style.display = 'none';

                 }

         });

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

    // Click event on every card to open the modal window 
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

        // format the birthday to a local data 
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

        <div class="modal-btn-container">
            <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
            <button type="button" id="modal-next" class="modal-next btn">Next</button>
        </div>
        
        `;

        document.body.insertBefore(modalContainer, document.querySelector('script'));

    const modalCloseBtn = document.getElementById('modal-close-btn');

    // Close the modal window
    modalContainer.addEventListener('click', event => {

        if(event.target === modalCloseBtn || modalCloseBtn.contains(event.target)) {

            modalContainer.remove();

        }

    })

    //Toggle back and forth between employees when the modal window is open.

    const modalBtn = document.querySelector('.modal-btn-container');
    const nextBtn = document.getElementById('modal-next');
    const prevBtn = document.getElementById('modal-prev');

    if (user === users[0]) {

        modalContainer.classList.add('first');

    } else if (user === users[11]) {

        modalContainer.classList.add('last');

    }


    modalBtn.addEventListener('click', event => {

        if(event.target === nextBtn) {

            modalContainer.remove();
            generateModalWindow(users, index + 1);

        } else if(event.target === prevBtn) {

            modalContainer.remove();
            generateModalWindow(users, index - 1);
        }

    })

    // Remove prev-button when the first modal is showing,
    // Remove next-button when the last modal is showing.

    if(modalContainer.classList.contains('first')) {

        prevBtn.remove();

    } else if(modalContainer.classList.contains('last')) {

        nextBtn.remove();

    }

}

// Call the createSearchBar function
createSearchBar();


//-----------
// Fetch Data
//-----------
fetchData('https://randomuser.me/api/?results=12&nat=au,ca,gb,nl,nz,us')

    .then(data => generateCard(data))
    .catch(error => console.error(error) )


    