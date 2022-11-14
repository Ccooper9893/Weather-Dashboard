
/* Steps to code */
//Grab city name from user search
//Insert city name into geoUrl api
//Grab latitude and longitude from geoUrl
//Insert latitude and longtude into requestUrl
//Grab weather information from requestUrl
//Insert weather information into html document

/* Weather API DOCS */
//Weather API Doc: https://openweathermap.org/forecast5
//Weather API key: 2e4652b7589b2f1ce92a963bd9db3bfa
//5-day Weather Forecast URL: api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
//Direct Geocoding: http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
//Use Direct Geocoding to grab latitude and longitude to plug into 5-day Weather-forcast request.

//Query Selectors for forecast dates
var day1 = document.querySelector('#day1');
var day2 = document.querySelector('#day2');
var day3 = document.querySelector('#day3');
var day4 = document.querySelector('#day4');
var day5 = document.querySelector('#day5');
var daysArr = [day1, day2, day3, day4, day5];

//Query Selectors for Current Weather
var cityName = document.querySelector('#cityName');
var currentIcon = document.querySelector('#iconCurrent');
var currentSky = document.querySelector('#currentSky')
var currentTemp = document.querySelector('#currentTemp');
var currentWind = document.querySelector('#currentWind')
var currentHum = document.querySelector('#currentHumidity');

//Query selectors for Sky conditions
var day1Sky = document.querySelector('#day1Sky');
var day2Sky = document.querySelector('#day2Sky');
var day3Sky = document.querySelector('#day3Sky');
var day4Sky = document.querySelector('#day4Sky');
var day5Sky = document.querySelector('#day5Sky');
var skyArr = [day1Sky, day2Sky,  day3Sky, day4Sky, day5Sky,];


//Query selectors for Icons
var icon1 = $('#icon1');
var icon2 = $('#icon2');
var icon3 = $('#icon3');
var icon4 = $('#icon4');
var icon5 = $('#icon5');
var iconArr = [icon1, icon2, icon3, icon4, icon5];

//Query selectors for Temperature
var day1Temp = document.querySelector('#temperature1');
var day2Temp = document.querySelector('#temperature2');
var day3Temp = document.querySelector('#temperature3');
var day4Temp = document.querySelector('#temperature4');
var day5Temp = document.querySelector('#temperature5');
var tempArr = [day1Temp, day2Temp, day3Temp, day4Temp, day5Temp];

//Query selectors for Wind speed
var day1Wind = document.querySelector('#wind1');
var day2Wind = document.querySelector('#wind2');
var day3Wind = document.querySelector('#wind3');
var day4Wind = document.querySelector('#wind4');
var day5Wind = document.querySelector('#wind5');
var windArr = [day1Wind, day2Wind, day3Wind, day4Wind, day5Wind];

//Query selectors for Humidty
var hum1 = document.querySelector('#humidity1');
var hum2 = document.querySelector('#humidity2');
var hum3 = document.querySelector('#humidity3');
var hum4 = document.querySelector('#humidity4');
var hum5 = document.querySelector('#humidity5');
var humArr = [hum1, hum2, hum3, hum4, hum5];

//Random Variables
var timeArr = [3, 11, 19, 27, 35]; //3pms for each day in weather forecast Api data
var searchContainer = document.querySelector('#searchContainer');
var historyArr = [];
var searchInput = document.querySelector('#searchBarInput')
var searchHistoryArr = JSON.parse(localStorage.getItem('City'));

//Collects current date
var currentDate = dayjs().format('dddd MMM D, YYYY');

// Checks localStorage for recent searches and appends buttons
function init() {
    var searchHistoryArr = JSON.parse(localStorage.getItem('City'));
    if (searchHistoryArr !== null) {
        for (i=0; i<searchHistoryArr.length; i++) {
            var crtBtn = document.createElement('button');
            crtBtn.innerHTML = searchHistoryArr[i];
            searchContainer.appendChild(crtBtn);
            historyArr.push(searchHistoryArr[i]);

        };
    };
};

init();

//Grabs input from user and fetches data from OpenWeather
function getInput() {
    var apikey = '2e4652b7589b2f1ce92a963bd9db3bfa';
    var geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${userInput}&units=imperial&appid=${apikey}`;

    if (userInput === '') {
        window.alert('Please enter a valid city name!') //TODO: Change to fancy alert
    } else {
        
    function getApi() { //Grabs coordinates for valid city name
        fetch(geoUrl) //Fetches geolocation coordinates
        .then(function (response) {
            return response.json(); 
          })
            .then(function(data){ 
                if (data.length === 0) { //Checks if user entered valid city
                    window.alert('Please enter a valid city name!'); //Alerts user to enter a valid city
                } else { //Continues with fetch and begins weather data insertions

                var lat = data[0].lat; //Saves lattitude to variable
                var lon = data[0].lon; //Saves longitude to variable

                //Inserts lattitude and longitude into api URL to grab weather forecast
                var requestUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apikey}`
                var currentWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apikey}`

                fetch(currentWeather) //Fetches current Weather forecast 
                    .then((response) => response.json())
                    .then(function(data) { 
                        var iconCode = data.weather[0].icon;
                        var iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`//Grabs icon via code
                        cityName.innerHTML = data.name;
                        $('#iconCurrent').attr('src', iconUrl); //Updates weather icon
                        currentSky.innerHTML = data.weather[0].main;
                        currentTemp.innerHTML = `Temp: ${data.main.temp}&#8457`; //Updates temperature
                        currentWind.innerHTML = `Wind: ${data.wind.speed} MPH`;
                        currentHum.innerHTML = `Humidity: ${data.main.humidity}%`;
                    })
                fetch(requestUrl) //Fetches the future 5 day-forecast/3 hour periods 
                    .then((response) => response.json())
                    .then(function(data) {
                        //Fills dates for weather containers
                        var datesArr = [];
                        for (i=1; i<6; i++) {
                            datesArr.push(dayjs().add(i, 'day').format('MM/D/YYYY'));
                            daysArr[i-1].innerHTML = datesArr[i-1];
                        }
                        $('#currentTime').text(currentDate);
                        for (i=0; i<5; i++) { //Inserts weather forecast values into containers
                            skyArr[i].innerHTML = data.list[timeArr[i]].weather[0].main;
                            var iconCode = data.list[timeArr[i]].weather[0].icon
                            var iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`
                            iconArr[i].attr('src', iconUrl);
                            tempArr[i].innerHTML = `Temp: ${data.list[timeArr[i]].main.temp}&#8457`;
                            windArr[i].innerHTML = `Wind: ${data.list[timeArr[i]].wind.speed} MPH`;
                            humArr[i].innerHTML = `Humidity: ${data.list[timeArr[i]].main.humidity}%`;
                        }
                        $('.hide').removeClass('hide');
                        if (historyArr.indexOf(userInput) !== -1) { //Checks if userInput is in history Array
                            return;
                        } else { //If userInput is not in history Arr it will make a new button and save to localStorage
                            var crtBtn = document.createElement('button');
                            crtBtn.innerHTML = userInput;
                            searchContainer.appendChild(crtBtn); //Creates new button
                            historyArr.push(userInput);
                            localStorage.setItem('City', JSON.stringify(historyArr)); //Saves city name to localStorage
                        }
                    })
                }
            })
        };

    getApi();
}};

//Adds an event listener for all buttons including future buttons made.
document.addEventListener('click', function(event) {
    if (event.target.matches('#searchBtn')) {
        userInput = $('#searchBarInput').val();
        getInput();
    } else if (event.target.matches("button")) {
        userInput = event.target.innerHTML;
        getInput();
    }
});

