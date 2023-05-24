var APIKEY = "e82bf9e3edbea0435d03a1e395e25104";
var LIMIT = '1';

var userFormEl = document.querySelector('#user-form');
var cityInputEl = document.querySelector('#cityname');
var fcContainerEl = document.querySelector('#forecast-container');
var fcSearchTerm = document.querySelector('#forecast-search-term');

var formSubmitHandler = function (event) {
    event.preventDefault();

    var cityname = cityInputEl.value.trim();
    console.log(cityname);

    if (cityname) {
        getForecast(cityname);

        fcContainerEl.textContent = '';
        cityInputEl.value = '';
    }
};
console.log(`This will show the API key: ${APIKEY}`)
// Weather API funciton?
var getForecast = function(cityname) {
    var apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityname}&limit=${LIMIT}&appid=${APIKEY}`;

fetch(apiUrl)
    .then(function (response) {
        if (response.ok) {
            console.log(response);
            response.json().then(function (data) {
                console.log(data);
                displayForecast(data, city);
            });
        } else {
            alert('Error: ' + response.statusText);
        }
    })
    .catch(function (error) {
        alert('Unable to connect to acess location');
    });
};

// ------------------
displayForecast = function (forecast, searchTerm) {
    if(forecast.length === 0) {
        fcContainerEl.textContent = "No Weather Found";
        return;
    }
}

fcSearchTerm.textContent = fcSearchTerm;




userFormEl.addEventListener('submit', formSubmitHandler);
    // console.log('button cicked');