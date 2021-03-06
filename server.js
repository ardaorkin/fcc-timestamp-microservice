// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

//require .env file
require('dotenv').config()


// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get("/api/timestamp/:date?", (req, res) => {
  var jsonResponse = {}
  const { date } = req.params
  var regex = /[^0-9]/i
  if (date != undefined) {
    if(date.match(regex) == null){
      var dateParam = parseInt(date)
    }else{
      var dateParam = date
    }
    if (new Date(dateParam).toUTCString() === "Invalid Date") {
      if (new Date(dateParam).toUTCString() === "Invalid Date") {
        jsonResponse = { error: "Invalid Date" }
      } else {
        jsonResponse = {
          unix: parseInt(dateParam),
          utc: new Date(dateParam).toUTCString()
        }
      }
    } else {
      jsonResponse = {
        unix: new Date(dateParam).getTime(),
        utc: new Date(dateParam).toUTCString()
      }
    }
  }else if(date == undefined){
    jsonResponse = {
      unix: new Date().getTime(),
      utc: new Date().toUTCString()
    }
  }
  res.send(jsonResponse)
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
