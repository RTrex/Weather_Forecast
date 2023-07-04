const express = require("express");

const https = require("https");

const bodyParser = require("body-parser");

require("dotenv").config();



const app = express();


app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){
  res.sendFile(__dirname+ "/index.html");
})

app.post("/", function(req,res){
const Country = req.body.cityName;
const apiKey = process.env.API_KEY;
const units = "imperial";
const link = "https://api.openweathermap.org/data/2.5/weather?q="+Country+"&appid="+apiKey+"&unit="+units;
https.get(link , function(response){
   console.log(response.statusCode);

    response.on("data", function(data){
        var weather1 = JSON.parse(data);
        console.log(weather1);
        const temp = weather1.main.temp;
        const weather2 = weather1.weather[0].description;
        const icon = weather1.weather[0].icon;
        const url = "https://openweathermap.org/img/wn/"+ icon +"@2x.png";
        res.write("<h1>The weather is "+weather2+"</h1>");
        res.write("<h1>The temp in "+ Country+ " is " +temp+" kelvin.</h1>");
        res.write("<img src = "+url+ ">");
        res.send();
    })
});
})

app.listen(3000, function(){
    console.log("server is up and running");
})