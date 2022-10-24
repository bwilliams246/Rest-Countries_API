/* Variables */
const availableCountries = document.getElementsByClassName('available-countries')[0];
const currentCountrySection = document.getElementsByClassName('current-country');
const popupSection = document.getElementsByClassName('popup-menu');
const searchBar = document.getElementsByClassName('country-search')[0];
const searchbox = document.getElementsByClassName('searchbar')[0];
const filterBox =document.getElementsByClassName('filter-container')[0];
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

const alterNavbar = () => {
    /* Function that hides the searchbox and displays the 'back' button */
    searchbox.classList.toggle('hide');
    filterBox.classList.toggle('hide');
    backBtn.classList.toggle('hide');
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
                <p class="info-region"><span>Region: </span>${regions[index]}</p>   
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

const deleteCurrentCountry = () => {
    /* Function that removes a SELECTED country's information before 
       closing the container
    */
    while (currentCountrySection[0].firstChild) {
        currentCountrySection[0].removeChild(currentCountrySection[0].firstChild);
    };
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
            alterNavbar();
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
        alterNavbar();
        deleteCurrentCountry(); 
        popupSection[0].classList.toggle('hide');
        currentCountrySection[0].classList.toggle('hide');
    });
};

const searchForCountry = () => {
    /* Function that :
        takes an input from the searchbar
        compares that search to each displayed country name
        hides each country-info card / container that doesn't include the input
    */
    const countryInfoCards = [...document.getElementsByClassName('country-info')];
    const availableNames = [...document.getElementsByClassName('country-name')];
    let search = '';

    searchBar.addEventListener('input' , e => {
        search = e.target.value.toLowerCase();

        availableNames.forEach( (countryName , i) => {
            let currentCountry = countryName.children[0].textContent.toLowerCase();

            if (currentCountry.includes(search)) {
                countryInfoCards[i].style.display = ''; 
            }
            else {
                countryInfoCards[i].style.display = 'none'; 
            };
        });
    });
};

const filterRegions = () => {
    /* Function that:
        adds a click listener to each of the filter options
        stores the selected / clicked region in a variable
        loops through each displayed region WITHIN each ocuntry-info container
        tests if the displayed region isn't what the the user selected
        hides the undesired regions
    */
    const countryInfoCards = [...document.getElementsByClassName('country-info')];
    const filterBoxOptions = [...document.getElementsByClassName('region')];
    const displayedRegions = [...document.getElementsByClassName('info-region')];

    filterBoxOptions.forEach( option => {
        option.addEventListener('click' , e => {
            let selectedRegion = `Region: ${e.target.textContent}`;
            
            displayedRegions.forEach( (region , i) => {
                if (!region.textContent.includes(selectedRegion)) {
                    countryInfoCards[i].classList.toggle('hide');
                };
            });
        });
    });
    
};

/*filterRegions();
searchForCountry(countryNames);
displayCurrentCountry();
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
        searchForCountry();
        filterRegions();
    };
};
xhttp.open("GET" , "https://restcountries.com/v3.1/all" , true);
xhttp.send();