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
let nativeNames = [];
let subregions = [];
let languages = [];
let currencies = [];
let regions = [];
let capitals = [];
let flags = [];
let tld = [];

/* Functions */
const dataStorage = data => {
    /* Function that stores the desired data into the corresponding array */
    countryNames.push(data.name.common);
    populations.push(data.population);
    nativeNames.push(data.name.nativeName);
    subregions.push(data.subregion);
    languages.push(data.languages);
    currencies.push(data.currencies);
    regions.push(data.region);
    capitals.push(data.capital);
    flags.push(data.flags.png);
    tld.push(data.tld);
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

const checkForDarkMode = () => {
    /* Function that "checks for dark mode ^_^" */
    let currentCountry = document.getElementsByClassName('current-country')[0];

    if (currentCountry.classList.contains('dark-mode-dark-blue')) {
        document.getElementsByClassName('current-country-flag')[0].classList.toggle('dark-mode-dark-blue');
        document.getElementsByClassName('current-country-info')[0].classList.toggle('dark-mode-dark-blue');
    };
};

const storeAdditionalOptions = ( obj, index, arr) => {
    /* Function that:
       loops through array of objects, 
       stores the property's value into an empty array 

       The API data has multiple sub-arrays, and inside those arrays, there
        may be a multitude of objects. Therefore, we need to loop through 
        each of these objects and store the VALUES of the objects inside 
        an array that will reset / empty once we close a selected country
    */
    for (let value in obj[index]) {
        arr.push(obj[index][value]);
    };
};

const displayAdditionalOptions = arr => {
    let allOptions = '';

    arr.forEach( option => {
        if (option !== arr[arr.length - 1]) {
            allOptions+= option + ', '
        }; 
    });
    allOptions += arr[arr.length - 1]

    return allOptions;
};

const updateCurrentCountry = index => {
    /* Function that places the selected country's stats in HTML elements 
       and appends them to a parent element
    */
   let currentCountryLanguages = [];
   let nativeName = [];
   let currency = [];
   let capitalName = '';
   let domain = '';

   storeAdditionalOptions(languages , index , currentCountryLanguages);
   storeAdditionalOptions(nativeNames , index , nativeName);
   storeAdditionalOptions(currencies , index , currency);

   let language = displayAdditionalOptions(currentCountryLanguages);

    if (capitals[index]) {
        capitalName = capitals[index][0];
    } else capitalName = 'none';

    if (tld[index]) {
        domain = tld[index][0];
    } else domain = 'none';

    console.log(domain);
    console.log(tld[index]);

   let currentCountryInfo = `<div class="current-country-flag"><img src="${flags[index]}" alt="Flag"></div>

    <div class="current-country-info">
        
        <div class="current-country-title"><h2>${countryNames[index]}</h2></div>

        <div>
            <div class="info-columns">
                <div class="first-column">
                    <div class="stat native-name"><span>Native Name: </span>${nativeName[0]['official']}</div>
                    <div class="stat current-population"><span>Population: </span>${populations[index].toLocaleString()}</div>
                    <div class="stat current-region"><span>Region: </span>${regions[index]}</div>
                    <div class="stat sub-region"><span>Sub Region: </span>${subregions[index]}</div>
                    <div class="stat current-capital"><span>Capital: </span>${capitalName}</div>
                </div>

                <div class="second-column">
                    <div class="stat domain"><span>Top Level Domain: </span>${domain}</div>
                    <div class="stat currency"><span>Currencies: </span>${currency[0]['name']}</div>
                    <div class="stat languages"><span>Languages: </span>${language}</div>
                </div>
            </div>`;
    
    currentCountrySection[0].insertAdjacentHTML('afterbegin' , currentCountryInfo);
    checkForDarkMode();
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
        
        /* Loops through the entire dataset */
        data.forEach( (obj , i) => {
            dataStorage(obj);
            displayCountries(i);
        });

        console.log(data);
        /* console.log(nativeNames[0]['bul']); */

        /* Displays additional information about a current flag */
        displayCurrentCountry();
        hideCurrentCountry();
        searchForCountry();
        filterRegions();
    };
};
xhttp.open("GET" , "https://restcountries.com/v3.1/all" , true);
xhttp.send();