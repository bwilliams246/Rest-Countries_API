/* Global Variables */
const countryFilter = document.getElementsByClassName('filter-dropdown')[0];
const continents = document.getElementsByClassName('filter-options')[0];

/* Event Listeners */
countryFilter.addEventListener('click' , e => continents.classList.toggle('hide'));