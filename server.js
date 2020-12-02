// server.js

const express = require("express");
const app = express();
const https = require("https");

// make all the files in 'public' available
app.use(express.static("public"));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

app.get("/map", (request, response) => {
  response.sendFile(__dirname + "/views/map.html");
});

app.get("/poem", (request, response) => {
  getPoem("quatrain", myMap[request.query.blockId], "0.01", response);
})


function getPoem(poemForm, places, surprise, response){
  
  
  var seeds = encodeURI(places.join(","));
  var pathT = `/PoetrymeWeb/rest/poetry?lang=en&form=${poemForm}&seeds=${seeds}&surp=${surprise}`;
  console.log(pathT)
  const options = {
    hostname: 'poetryme.dei.uc.pt',
    port: 443,
    path: pathT,
    method: 'GET'
  }


  const req = https.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`);
    var body = '';
    res.on('data', chunk => {
      body = body + chunk;
    })

    res.on('end',function(){
        //console.log(location);
        //console.log("Body :" + body);
        response.json(body);
    })
  })
  
  
req.on('error', error => {
  console.error(error)
})
  
req.end()
  

}

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});



let myMap=
{
  "105":["bank","sandwich","technical school","architect","nonprofit"],
  "107":["museum","transit","trade","comission","government"],
  "109":["school","coffee"],
  "111":["church","consultant","software","finance"],
  "201":["church","baby", "subway", "real estate","bank","personal injury attorney","mortgage lender"],
  "202":["coffee","dermatology", "acting", "private investigator","mailing","graduate school","business consultant"],
  "204":["coworking","American restaurant", "lighting", "financial consultant","college","law","government", "international center for transitional justice"],
  "206":["Global Entry processing office","bankrupcy court", "museum","archives"],
  "208":["national museum of the American Indian","investment", "university","law","finance"],
  "210":["coffee","garage", "consultancy","law", "software","construction"],
  
  "212":["church","business center", "investment company","park","transportation"],
  "305":["criminal justice attorney","tourist attraction", "cafe","vitamin","retail","transit","bank"],
  "307":["american indian museum","subway","coffee", "Mexican Restaurant", "transportation service","convenience store","healthcare","mail"],
  "309":["Health food restaurant", "Dentist","Financial institution", "Law"],
  "311":["media company", "software","construction", "radio broadcaster"],
  "313":["parking garage", "business center","entertainment", "transportation"]
}
