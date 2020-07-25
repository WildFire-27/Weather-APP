const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");//sends a whole page over a server
});

app.post("/", function (req, res) {

  const query = req.body.cityName;
  const apiKey = "94cfb5f9ab694e244cdcaeea715af49e";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;

  https.get(url, function (response) {
    console.log(response.statusCode);
//message the data or shows the data
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const descirption = weatherData.weather[0].description;//copy path from json awesome viewer
      const icon = weatherData.weather[0].icon;
      const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

      res.write("<h1>Description: "+ descirption+"</h1>");
      res.write("<h1>City: " + query + "</h1>");
      res.write("<h1>Temperature: " + temp + " Celcius</h1>")
      res.write("<img src=" + imageUrl + ">");
      res.send();
    });
  });

});//api from weather report and putting here api parameter frm postman


app.listen(3000, function () {
  console.log("Port 3000 is started here");
});

//weather ali my api key == 94cfb5f9ab694e244cdcaeea715af49e
//
