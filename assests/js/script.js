var APIKEY = "e82bf9e3edbea0435d03a1e395e25104";
var LIMIT = '1';

var userFormEl = document.querySelector('#user-form');
var cityInputEl = document.querySelector('#cityname');
var fcContainerEl = document.querySelector('#forecast-container');
var fcSearchTerm = document.querySelector('#forecast-search-term');

var temp = document.querySelector('#Temperature');
var wind = document.querySelector('#Wind');
var humid = document.querySelector('#Humidity');


// Event handler for city submition
var formSubmitHandler = function (event) {
    event.preventDefault();

    var cityname = cityInputEl.value.trim();
    console.log(cityname);

    if (cityname) {
        getLocation(cityname);

        fcContainerEl.textContent = '';
        cityInputEl.value = '';
    }
};
console.log(`This will show the API key: ${APIKEY}`)

// GEOLOCATION API 
var getLocation = function(cityname) {
    var apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityname}&limit=${LIMIT}&appid=${APIKEY}`;

fetch(apiUrl)
    .then(function (response) {
        if (response.ok) {
            console.log(response);
            response.json().then(function (data) {
                console.log(data);
                displayLocation(data, cityname);
                currForecast(data[0]);
            });
        } else {
            alert('Error: ' + response.statusText);
        }
    })
    .catch(function (error) {
        alert('Unable to connect to acess location');
    });
};

// collected information from API object 
// need data to call [lat]&[lon]

// CURRENT & FORECAST WEATHER DATA
var currForecast = function(cityname) {
    var {lat} = cityname;
    var {lon} = cityname;

    var currApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}`;

fetch(currApiUrl)
    .then(function (response) {
        if (response.ok) {
            console.log(response);
            response.json().then(function (data) {
                console.log(data);
                // displayForcast(data, cityname);

                // var temP = data['main']['temp']
                // var wndspd = data['wind']['speed']
                // var humid = data['main']['humidity']

            });
        }
    });
}

// Display city location 
var displayLocation = function (location, searchTerm) {
    if(!location) {
        fcContainerEl.textContent = "No Weather Found";
        return;
        fcSearchTerm.textContent = fcSearchTerm;
    } else {
        var cityEl = document.createElement('p');
        cityEl.textContent = location[0].name; 
        fcContainerEl.append(cityEl);
        
    }
}






userFormEl.addEventListener('submit', formSubmitHandler);
    // console.log('button cicked');