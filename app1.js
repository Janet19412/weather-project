// jshint esversion:6
const express = require("express");
const https = require("https");

const app = express();


app.get("/", function(req, res) {
  const url = "https://api.openweathermap.org/data/2.5/forecast?q=M%C3%BCnchen,DE&units=metric&appid=ebefc39a80dbb56f309f9d18de927602#";

  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data",function(data){
      const weatherData = JSON.parse(data);
      // const object = {
        // name:"Janet",
        // favouriteFood:"Ramen"
      // };
      // console.log(JSON.stringify(object));
      const speed = weatherData.list[0].wind.speed;
      // 对于要找的对象，可以直接copy path, 然后就写在后面就行。
      // console.log(speed);
      const weatherDescription = weatherData.list[5].weather[0].description;
      const icon = weatherData.list[5].weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

      res.write("<h1>the speed today is " + speed + ".</h1>");
      // 对于h1在放的位置上务必要放在双引号里面，不能放外面，否则无效。可以和其他的写在一起，也可以直接写"</h1>",都成立
      res.write("<p>The weather is currently " + weatherDescription + "</p>");
      res.write("<img src =" + imageURL + ">");
      res.send();
    });
  });
});

app.listen(3000, function() {
  console.log("Server is running on port 3000");
});
