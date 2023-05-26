var APIKEY = "e82bf9e3edbea0435d03a1e395e25104";
var LIMIT = '1';

var userFormEl = document.querySelector('#user-form');
var cityInputEl = document.querySelector('#cityname');
var fcContainerEl = document.querySelector('#forecast-container');
var fcSearchTerm = document.querySelector('#forecast-search-term');
var forecastContainerEl = document.querySelector("#weather-card");

var tempEl = document.querySelector('#Temperature');
var windEl = document.querySelector('#Wind');
var humidEl = document.querySelector('#Humidity');
var card = document.querySelector('#card-column');

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

    let allCity  = JSON.parse(localStorage.getItem('city-array')) || [];
    console.log();
    allCity.push(cityname);

    localStorage.setItem("city-array", JSON.stringify(allCity));

    for (let i = 0; i < allCity.length; i++) {
        let button = document.createElement("button");
        button.appendChild(card);
        document.body.appendChild(button)
        button.textContent = allCity[i];
        button.addEventListener("click, searchCity")
        document.querySelector(".display-cityname").appendChild(button);
    }
    
    function searchCity(event) {
        event.preventDefault();
        alert(event.target.innerText);
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

    var weekApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKEY}&units=imperial`;

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

            // CREATE ELEMENTS FOR DATA TO LIVE -----------------
            
            var date = document.createElement("h");
            var temperature = document.createElement("h6");
            var humid = document.createElement("h6");
            var winSpeed = document.createElement("h6");  
            
            // GRAB DATA AND TURN INTO READABLE TEXT CONTENT FOR PAGE
            date.textContent = "Date: " + forecastData.list[i].dt_txt;
            temperature.textContent = "Temperature: " + forecastData.list[i].main.temp + "F";
            humid.textContent = "Humidity: " + forecastData.list[i].main.humidity + "%";
            winSpeed.textContent = "Wind Speed: " + forecastData.list[i].wind.speed + "mph";

            var cards = document.createElement("div"); 
            cards.setAttribute("class", "card");
            cards.setAttribute("style", "width: 18rem;");
            cards.appendChild(date);
            cards.appendChild(temperature);
            cards.appendChild(humid);
            cards.appendChild(winSpeed);

            // APPEND DATA TO HTML VARIABLES -----------------
            forecastContainerEl.append(cards);
            forecastContainerEl.append(date);
            forecastContainerEl.append(temperature);
            forecastContainerEl.append(humid);
            forecastContainerEl.append(winSpeed);  
        }
    }             


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


// local storage




    userFormEl.addEventListener('submit', formSubmitHandler);
    // console.log('button cicked');