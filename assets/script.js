//Collects current date
var currentDate = dayjs().format('dddd MMM D, YYYY');
$('#currentTime').text(currentDate);

//Weather API Doc: https://openweathermap.org/forecast5
//Weather API key: 2e4652b7589b2f1ce92a963bd9db3bfa
//5-day Weather Forecast URL: api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
//Direct Geocoding: http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
//Use Direct Geocoding to grab latitude and longitude to plug into 5-day Weather-forcast request.
//City Information

// function getApi() {
//     fetch(geoUrl) 
//         .then((response) => response.json())
//         .then(function(data){
//             console.log(data);
//         })};
        









function getInput() {
    var userInput = $('#searchBarInput').val();
    var geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${userInput}&units=imperial&appid=2e4652b7589b2f1ce92a963bd9db3bfa`
    var apikey = '2e4652b7589b2f1ce92a963bd9db3bfa';
    function getApi() {
        fetch(geoUrl) 
            .then((response) => response.json())
            .then(function(data){

                console.log(data);
                var lat = data[0].lat;
                var lon = data[0].lon;
                var requestUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apikey}`


                fetch(requestUrl)
                    .then((response) => response.json())
                    .then(function(data) {
                        console.log(data);

                    })
            })};
    
    getApi();
}



$('#searchBtn').on('click', getInput);

//Grab city name from user search
//Insert city name into geoUrl api
//Grab latitude and longitude from geoUrl
//Insert latitude and longtude into requestUrl
//Grab weather information from requestUrl
//Insert weather information into html document















//Weather API Doc: https://openweathermap.org/forecast5
//Weather API key: 2e4652b7589b2f1ce92a963bd9db3bfa
//5-day Weather Forecast URL: api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
//Direct Geocoding: http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
//Use Direct Geocoding to grab latitude and longitude to plug into 5-day Weather-forcast request.