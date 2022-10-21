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
}

/* API GET Request */
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        let data = JSON.parse(xhttp.responseText);
        
        /* Loop through the entire dataset */
        data.forEach( (obj) => {
            dataStorage(obj);
        });

        for (let i = 0 ; i < 9 ; i++) {
            let countryInfo = `<div class="country-info">
                    <div class="country-flag"><img src="${flags[i]}" alt="Flag"></div>
                    <div class="country-name"><h4>${countryNames[i]}</h4></div>
                    <p class="population">Population: ${populations[i]}</p>   
                    <p class="region">Region: ${regions[i]}</p>   
                    <p class="capital">Capital: ${capitals[i][0]}</p>   
                </div>`;

            availableCountries.insertAdjacentHTML('afterbegin' , countryInfo);
        }
    };
};
xhttp.open("GET" , "https://restcountries.com/v3.1/all" , true);
xhttp.send();