// index.js
// where your node app starts
Date.prototype.getUnixTime = function() { return this.getTime()/1000|0 };
// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

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

app.get("/api/:date?", function(req, res){
  console.log(req.params, typeof(req.params.date), req.params.date.length, req.params.date[2], req.params.date[4]);
  try{
    if(req.params.date[2] === "-" || req.params.date[4] === "-"){
      console.log("normal date string")
      let date = req.params.date;
      if(new Date(date).toUTCString() === "Invalid Date")
        throw("Invalid Date");
      console.log(date, new Date(date).toUTCString());
      let utcDate = new Date(date).toUTCString();
      let unixDate = new Date(date).getUnixTime();
      res.json({unix: unixDate, utc: utcDate});
    }
    else if(req.params.date.length === 13){
      console.log("unix date timestamp")
      let date = Number(req.params.date);
      if(new Date(date).toUTCString() === "Invalid Date")
        throw("Invalid Date");
      console.log(date, new Date(date).toUTCString());
      let utcDate = new Date(date).toUTCString();
      let unixDate = new Date(date).getUnixTime();
      res.json({unix: unixDate, utc: utcDate});
    }
    else throw("Invalid Date");
  }
  catch (err){
    console.log(err);
    res.json({error: "Invalid Date"})
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
