// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// API endpoint for empty request
app.get("/api/timestamp/", function (req, res) {
  
  var time = new Date()
  
  res.json({
    "unix": time.getTime(),
    "utc": time.toUTCString()
  })
  
  
});

// API endpoing for other time requests
app.get("/api/timestamp/:time", function (req, res) {
  
    
  var originalTime = new Date(req.params.time);
  var unixDate = originalTime.getTime();
  
  if(!Date.parse(req.params.time)){
    res.json({
      "unix": req.params.time,
      "utc": new Date(Number(req.params.time))
    })    
  } else {
      res.json({
        "unix": unixDate,
        "utc": originalTime.toUTCString()
      })
  }

  
  
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});