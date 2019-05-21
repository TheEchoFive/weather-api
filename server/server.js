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


let counter = 0;
let weatherInCity;
let apiKey = 'f9d5106fd248c9f39548c1e7d65f6986';

app.get('/', function(req, res) {
    res.render("index", {
        title: "Weather API",
        discription: "Enter Your City",
        Request: false,
        error: null
    });
})

app.post('/', (req, res) => {
    console.log(req.body.city);
    request(`http://api.openweathermap.org/data/2.5/weather?q=${req.body.city}&APPID=${apiKey}`, function(err, response, weather) {
        weatherInCity = JSON.parse(weather)
        if (weatherInCity.cod == 404 || err) {
            res.render('index', {
                Request: false,
                error: 'Error, please try again'
            });
        } else {
            console.log(`${counter++} - ${weatherInCity.name}`);
            res.render('index', {
                Request: true,
                City: weatherInCity.name,
                Weather: weatherInCity.weather[0].description,
                Temperatura: weatherInCity.main.temp,
                Pressure: weatherInCity.main.pressure,
                error: null
            });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})
