var APIKEY = "e82bf9e3edbea0435d03a1e395e25104";
var LIMIT = '1';

var userFormEl = document.querySelector('#user-form');
var cityInputEl = document.querySelector('#cityname');
var fcContainerEl = document.querySelector('#forecast-container');
var fcSearchTerm = document.querySelector('#forecast-search-term');

var tempEl = document.querySelector('#Temperature');
var windEl = document.querySelector('#Wind');
var humidEl = document.querySelector('#Humidity');


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

    var currApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}&units=imperial`;

fetch(currApiUrl)
    .then(function (response) {
        if (response.ok) {
            console.log(response);
            response.json().then(function (data) {
                console.log(data);
                displayForecast(data, cityname);
                
            
            });
        }
    });
}

// 5 DAY FORECAST API!!!!
var fiveAPI = function(cityname) {
    var {lat} = cityname;
    var {lon} = cityname;

    var fiveApiUrl = `api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid={APIKEY}`;

fetch(fiveApiUrl)
    .then(function (response) {
        if (response.ok) {
            console.log(response);
            response.json().then(function (data) {
                console.log(data);
                displayWeek(data, cityname);
            });
        }
    });
}

// Display forecast
var displayForecast = function (forecast, fcSearchTerm) {
    tempEl = document.createElement('p');
    windEl = document.createElement('p');
    tempEl.textContent = "Temperature: " + forecast.main.temp + " F";
    windEl.textContent = "Wind Speed: " + forecast.wind.speed + " Mph";
    // console.log(forecast);
    fcContainerEl.append(tempEl)
    fcContainerEl.append(windEl);
    
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