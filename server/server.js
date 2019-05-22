const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 4001;

app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

let counter = 1;
let weatherInCity;
let weatherOne = {};
let weatherTwo = {};
let weatherThre = {};
let apiKey = 'f9d5106fd248c9f39548c1e7d65f6986';


 setInterval(function() {
    request(`http://api.openweathermap.org/data/2.5/weather?q=New+York&units=metric&APPID=${apiKey}`, function(err, response, weather) {
      let weatherOneJSON = JSON.parse(weather)
        if (err) {
              weatherOne.request = false,
              weatherOne.error = 'Error, please try again'
        } else {
              weatherOne.request = true
              weatherOne.city = weatherOneJSON.name
              weatherOne.weather = weatherOneJSON.weather[0].description
              weatherOne.temperatura = weatherOneJSON.main.temp
              weatherOne.pressure = weatherOneJSON.main.pressure
              weatherOne.humidity = weatherOneJSON.humidity
              weatherOne.windSpeed = weatherOneJSON.wind.speed
              weatherOne.windDeg = weatherOneJSON.wind.deg
              weatherOne.sunSet = weatherOneJSON.sys.sunrise
              weatherOne.sunRise = weatherOneJSON.sys.sunset
              weatherOne.error = null
             console.log(`${weatherOne.city} OK`);
        }
    });

    request(`http://api.openweathermap.org/data/2.5/weather?q=Budva&units=metric&APPID=${apiKey}`, function(err, response, weather) {
      let weatherTwoJSON = JSON.parse(weather)
        if (err) {
              weatherTwo.request = false,
              weatherTwo.error = 'Error, please try again'
        } else {
              weatherTwo.request = true
              weatherTwo.city = weatherTwoJSON.name
              weatherTwo.weather = weatherTwoJSON.weather[0].description
              weatherTwo.temperatura = weatherTwoJSON.main.temp
              weatherTwo.pressure = weatherTwoJSON.main.pressure
              weatherTwo.humidity = weatherTwoJSON.humidity
              weatherTwo.windSpeed = weatherTwoJSON.wind.speed
              weatherTwo.windDeg = weatherTwoJSON.wind.deg
              weatherTwo.sunSet = weatherTwoJSON.sys.sunrise
              weatherTwo.sunRise = weatherTwoJSON.sys.sunset
              weatherTwo.error = null
             console.log(`${weatherTwo.city} OK`);
        }
    });

    request(`http://api.openweathermap.org/data/2.5/weather?q=Kiev&units=metric&APPID=${apiKey}`, function(err, response, weather) {
      let weatherThreJSON = JSON.parse(weather)
        if (err) {
              weatherThre.request = false,
              weatherThre.error = 'Error, please try again'
        } else {
              weatherThre.request = true
              weatherThre.city = weatherThreJSON.name
              weatherThre.weather = weatherThreJSON.weather[0].description
              weatherThre.temperatura = weatherThreJSON.main.temp
              weatherThre.pressure = weatherThreJSON.main.pressure
              weatherThre.humidity = weatherThreJSON.humidity
              weatherThre.windSpeed = weatherThreJSON.wind.speed
              weatherThre.windDeg = weatherThreJSON.wind.deg
              weatherThre.sunSet = weatherThreJSON.sys.sunrise
              weatherThre.sunRise = weatherThreJSON.sys.sunset
              weatherThre.error = null
             console.log(`${weatherThre.city} OK`);
        }
    });

 }, 600000);



app.get('/', function(req, res) {
  res.render('index', {
  weatherOne: JSON.stringify(weatherOne),
  weatherTwo: JSON.stringify(weatherTwo),
  weatherThre: JSON.stringify(weatherThre)
});

});

app.post('/', (req, res) => {
    console.log(req.body.city);
    request(`http://api.openweathermap.org/data/2.5/weather?q=${req.body.city}&units=metric&APPID=${apiKey}`, function(err, response, weather) {
        weatherInCity = JSON.parse(weather)
        if (weatherInCity.cod == 404 || err) {
            res.render('index', {
                Request: false,
                error: 'Error, please try again'
            });
        } else {
            console.log(`${counter++} - ${weatherInCity.name}`);
            res.render('index', {
                request: true,
                city: weatherInCity.name,
                weather: weatherInCity.weather[0].description,
                temperatura: weatherInCity.main.temp,
                pressure: weatherInCity.main.pressure,
                humidity: weatherInCity.main.humidity,
                windSpeed: weatherInCity.wind.speed,
                windDeg: weatherInCity.wind.deg,
                sunSet: weatherInCity.sys.sunrise,
                sunRise: weatherInCity.sys.sunset,
                visibility: weatherInCity.visibility,
                error: null
            });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})
