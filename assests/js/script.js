var APIKEY = "e82bf9e3edbea0435d03a1e395e25104";
var LIMIT = '1';

var userFormEl = document.querySelector('#user-form');
var cityInputEl = document.querySelector('#cityname');
var fcContainerEl = document.querySelector('#forecast-container');
var fcSearchTerm = document.querySelector('#forecast-search-term');
var forecastContainerEl = document.querySelector("weather-card");

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
var getLocation = function (cityname) {
    var apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityname}&limit=${LIMIT}&appid=${APIKEY}`;

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
                    console.log(data);
                    displayLocation(data, cityname);
                    currForecast(data[0]);
                    weekAPI(data[0]);
                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            alert('Unable to connect to acess location');
        });
};


// CURRENT & FORECAST WEATHER DATA
var currForecast = function (cityname) {
    var { lat } = cityname;
    var { lon } = cityname;

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
var weekAPI = function (cityname) {
    var { lat } = cityname;
    var { lon } = cityname;

    var weekApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKEY}`;

    fetch(weekApiUrl)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
                    console.log(data);
                    displayweekData(data, cityname);
                });
            }
        });
}

    var displayweekData = function (forecastData, fcSearchTerm) {
        for (i = 4; i < forecastData.list.length; i=i+4) {

            var temp1El = document.querySelector("temp-1");
            
            

            var date = document.createElement("h3");
            // var temperature = document.createElement("h4");
            temp1El = document.createElement('h4'); 

            var humid = document.createElement("h5");
            var winSpeed = document.createElement("h6");  
            
                date.textContent = forecastData.list[i].dt.txt;
                temp1El.textContent = "Temperature: " + forecastData.list[i].main.temp ;
                humid.textContent = forecastData.list[i].main.humidity + "%";
                winSpeed.textContent = forecastData.list[i].wind.speed + "mph";

                // forecastContainerEl.append(date);
                forecastContainerEl.append(temp1El);
                forecastContainerEl.append(humid);
                forecastContainerEl.append(winSpeed);  
        };
    }             
    // Display Five Day 
    // var displayWeek = function (week, fcSearchTerm) {


    // }

    // Display forecast
    var displayForecast = function (forecast, fcSearchTerm) {
        tempEl = document.createElement('p');
        windEl = document.createElement('p');
        humidEl = document.createElement('p');
        tempEl.textContent = "Temperature: " + forecast.main.temp + " F";
        windEl.textContent = "Wind Speed: " + forecast.wind.speed + " Mph";
        humidEl.textContent = "Humidity: " + forecast.main.humidity + "%";
        // console.log(forecast);
        fcContainerEl.append(tempEl);          
        fcContainerEl.append(windEl);
        fcContainerEl.append(humidEl);

    }

    // Display city location 
    var displayLocation = function (location, searchTerm) {
        if (!location) {
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