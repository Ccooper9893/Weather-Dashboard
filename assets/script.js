var currentDate = dayjs().format('MMM D, YYYY');

$('#currentTime').text(currentDate);






































//Weather API Doc: https://openweathermap.org/forecast5
//Weather API key: 2e4652b7589b2f1ce92a963bd9db3bfa
//5-day Weather Forecast URL: api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
//Direct Geocoding: http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
//Use Direct Geocoding to grab latitude and longitude to plug into 5-day Weather-forcast request.