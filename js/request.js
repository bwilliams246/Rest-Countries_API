/* Variables */
const availableCountries = document.getElementsByClassName('available-countries')[0];
const currentCountrySection = document.getElementsByClassName('current-country');
const popupSection = document.getElementsByClassName('popup-menu');
const backBtn = document.getElementsByClassName('back-btn')[0];
let countryNames = [];
let populations = [];
let subregions = [];
let regions = [];
let capitals = [];
let flags = [];
let tld = [];

/* Functions */
const dataStorage = data => {
    /* Function that stores the desired data into the corresponding array */
    countryNames.push(data.name.common);
    populations.push(data.population);
    subregions.push(data.tld);
    regions.push(data.region);
    capitals.push(data.capital);
    flags.push(data.flags.png);
};

const displayCountries = (index) => {
    /* Function that takes in the current index in a loop
       places a country's stats in HTML and appends them to a parent element 
    
       Function also checks to see if a country has a capital
    */
   let capitalName = '';
   let domain = '';

    if (capitals[index]) {
        capitalName = capitals[index][0];
    } else capitalName = 'none';

    let countryInfo = `<div class="country-info">
                <div class="country-flag"><img src="${flags[index]}" alt="Flag"></div>
                <div class="country-name"><h4>${countryNames[index]}</h4></div>
                <p class="population"><span>Population: </span>${populations[index].toLocaleString()}</p>   
                <p class="region"><span>Region: </span>${regions[index]}</p>   
                <p class="capital"><span>Capital: </span>${capitalName}</p>   
            </div>`;

        availableCountries.insertAdjacentHTML('afterbegin' , countryInfo);
};

const updateCurrentCountry = index => {
    /* Function that places the selected country's stats in HTML elements 
       and appends them to a parent element
    */
   let capitalName = '';
   let domain = '';

    if (capitals[index]) {
        capitalName = capitals[index][0];
    } else capitalName = 'none';

    if (tld[index]) {
        domain = tld[index][0];
    } else domain = 'none';

   let currentCountryInfo = `<div class="current-country-flag"><img src="${flags[index]}" alt="Flag"></div>

    <div class="current-country-info">
        
        <div class="current-country-title"><h2>${countryNames[index]}</h2></div>

        <div>
            <div class="info-columns">
                <div class="first-column">
                    <div class="stat native-name"><span>Native Name: </span></div>
                    <div class="stat current-population"><span>Population: ${populations[index].toLocaleString()}</span></div>
                    <div class="stat current-region"><span>Region: ${regions[index]}</span></div>
                    <div class="stat sub-region"><span>Sub Region: </span></div>
                    <div class="stat current-capital"><span>Capital: ${capitalName}</span></div>
                </div>

                <div class="second-column">
                    <div class="stat domain"><span>Top Level Domain: ${domain}</span></div>
                    <div class="stat currency"><span>Currencies: </span></div>
                    <div class="stat languages"><span>Languages: </span></div>
                </div>
            </div>`;
    
    currentCountrySection[0].insertAdjacentHTML('afterbegin' , currentCountryInfo);
};

const displayCurrentCountry = () => {
    /* Function that loop through each flag image and adds a click listener 
       Once a flag is clicked, a container displaying additional information
       about the country appears

       **NOTE** You must reverse() the displayedFlags array in order to 
       get the correct index
    */
    const displayedFlags = [...document.getElementsByClassName('country-flag')];
    
    displayedFlags.reverse().forEach( (flag , i) => {
        flag.addEventListener('click' , (e) => {
            updateCurrentCountry(i); 
            popupSection[0].classList.toggle('hide');
            currentCountrySection[0].classList.toggle('hide');
        });
    });
};

const hideCurrentCountry = () => {
    /* Function that hides the additional country information container 
       by clicking the Back Button
    */
    backBtn.addEventListener('click' , e => {
        /* deleteCurrentCountry(); */
        popupSection[0].classList.toggle('hide');
        currentCountrySection[0].classList.toggle('hide');
    });
};

/* displayCurrentCountry();
hideCurrentCountry(); */

/* API GET Request */
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        let data = JSON.parse(xhttp.responseText);
        console.log(data[10].languages);
        
        /* Loops through the entire dataset */
        data.forEach( (obj , i) => {
            dataStorage(obj);
            displayCountries(i);
        });

        /* Displays additional information about a current flag */
        displayCurrentCountry();
        hideCurrentCountry();
    };
};
xhttp.open("GET" , "https://restcountries.com/v3.1/all" , true);
xhttp.send();