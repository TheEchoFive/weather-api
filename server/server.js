const express = require('express');
const request = require('request');
const app = express();
const PORT = process.env.PORT || 3000;

let weatherParse = '';

let counter = 1;

let apiKey = 'f9d5106fd248c9f39548c1e7d65f6986';
app.get('/:city', (req, res) => {
   request(`http://api.openweathermap.org/data/2.5/weather?q=${req.params.city}&APPID=${apiKey}`, function (err, response, weather) {
      weatherParse = JSON.parse(weather)
  if (weatherParse.cod == 404) {
    res.status(404).send('Not Found');
      } else {

        console.log(`${counter++} - ${weatherParse.name}`);
        res.send(`Температура в ${weatherParse.name} - ${weatherParse.main.temp} F. Погода ${weatherParse.weather[0].description}`);
   }
   });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
