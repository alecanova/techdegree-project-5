//------------------
//Global variables
//------------------
const gallery = document.getElementById('gallery');
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

