/* Variables */
const availableCountries = document.getElementsByClassName('available-countries')[0];
let countryNames = [];
let populations = [];
let regions = [];
let capitals = [];
let flags = [];

/* Functions */
const dataStorage = data => {
    /* Function that stores the desired data into the corresponding array */
    countryNames.push(data.name.common);
    populations.push(data.population);
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
}

/* API GET Request */
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        let data = JSON.parse(xhttp.responseText);
        
        /* Loop through the entire dataset */
        data.forEach( (obj , i) => {
            dataStorage(obj);
            displayCountries(i);
        });
    };
};
xhttp.open("GET" , "https://restcountries.com/v3.1/all" , true);
xhttp.send();