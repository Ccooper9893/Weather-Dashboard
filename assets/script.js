//Collects current date
var currentDate = dayjs().format('dddd MMM D, YYYY');
$('#currentTime').text(currentDate);

//Weather APIs
var Apikey = '2e4652b7589b2f1ce92a963bd9db3bfa'
var geoUrl = 'https://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid=2e4652b7589b2f1ce92a963bd9db3bfa'
var requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=36.3724&lon=94.2102&units=imperial&appid=2e4652b7589b2f1ce92a963bd9db3bfa'

function getApi() {
    fetch(requestUrl) 
        .then((response) => response.json())
        .then((data) => console.log(data))
};

getApi();
























//Weather API Doc: https://openweathermap.org/forecast5
//Weather API key: 2e4652b7589b2f1ce92a963bd9db3bfa
//5-day Weather Forecast URL: api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
//Direct Geocoding: http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
//Use Direct Geocoding to grab latitude and longitude to plug into 5-day Weather-forcast request.