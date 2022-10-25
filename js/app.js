/* Global Variables */
const darkModeSeletor = document.getElementsByClassName('dark-mode-toggle')[0];
const countryFilter = document.getElementsByClassName('filter-dropdown')[0];
const continents = document.getElementsByClassName('filter-options')[0];

/* Event Listeners */
countryFilter.addEventListener('click' , e => continents.classList.toggle('hide'));
darkModeSeletor.addEventListener('click' , e => {
    darkModeToggle();
});


/* Additional Functions */
const darkModeToggle = () => {
    /* function that toggles between light and dark mode */
    let currentCountry = document.getElementsByClassName('current-country')[0];
    /* Navbar Styles */
    document.getElementsByClassName('world-logo')[0].classList.toggle('dark-mode-font-color');
    document.getElementsByClassName('world-logo')[0].firstChild.classList.toggle('dark-mode-light-blue');
    document.getElementsByClassName('navbar')[0].classList.toggle('dark-mode-light-blue');
    document.getElementsByClassName('nav-options')[0].classList.toggle('dark-mode-light-blue');
    darkModeSeletor.classList.toggle('dark-mode-light-blue');
    darkModeSeletor.classList.toggle('dark-mode-font-color');

    document.body.classList.toggle('dark-mode-dark-blue');
    document.body.classList.toggle('dark-mode-font-color');

    document.getElementsByClassName('searchbar')[0].classList.toggle('dark-mode-light-blue');
    document.getElementsByClassName('filter-container')[0].classList.toggle('dark-mode-light-blue');
    document.getElementsByClassName('search-and-filter')[0].classList.toggle('dark-mode-dark-blue');
    document.getElementsByClassName('country-search')[0].classList.toggle('dark-mode-light-blue');
    document.getElementsByClassName('country-search')[0].classList.toggle('dark-mode-font-color');
    document.getElementsByClassName('filter-dropdown')[0].classList.toggle('dark-mode-light-blue');
    document.getElementsByClassName('filter-dropdown')[0].firstChild.classList.toggle('dark-mode-light-blue');
    document.getElementsByClassName('filter-options')[0].classList.toggle('dark-mode-light-blue');

    document.getElementsByClassName('back-btn')[0].classList.toggle('dark-mode-light-blue');
    document.getElementsByClassName('popup-menu')[0].classList.toggle('dark-mode-light-blue');
    document.getElementsByClassName('current-country')[0].classList.toggle('dark-mode-dark-blue');

    if (currentCountry.hasChildNodes()) {
        document.getElementsByClassName('current-country-flag')[0].classList.toggle('dark-mode-dark-blue');
        document.getElementsByClassName('current-country-info')[0].classList.toggle('dark-mode-dark-blue');
    }
    
    let filterOptions = [...document.getElementsByClassName('filter-options')[0].children];

    filterOptions.forEach( elem => {
        elem.classList.toggle('dark-mode-light-blue')
    })

    let infoCards = [...document.getElementsByClassName('country-info')]

    infoCards.forEach( elem => {
        elem.classList.toggle('dark-mode-light-blue');
    })
};