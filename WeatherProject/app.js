const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");  
});

app.post("/", function(req, res){

    const query = req.body.cityName;
    const apiKey = "967f157b9df6e5e2933da70873682fc4";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
    https.get(url, function(response){
        console.log(response.statusCode);
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const desc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            console.log(temp);
            console.log(desc);
            res.write("<h1>The temperature in " + query + " is " + temp + " degree celsius.</h1>");
            res.write("<p>The weather is currently " + desc + "</p>");
            res.write("<img src=" + imageURL + ">");
            res.send();
        });
    });

});

    
app.listen(3000, function(){
    console.log("Server is running on port 3000.");
});
