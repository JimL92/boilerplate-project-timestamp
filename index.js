// index.js
// where your node app starts
Date.prototype.getUnixTime = function() { return this.getTime(); };
// init project
var express = require('express');
var app = express();

function isValidDate(d) {
  console.log(d instanceof Date, isNaN(d))
  return d instanceof Date && !isNaN(d);
}

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function(req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", function(req, res) {
  try {
    if (req.params === undefined || !req.params.hasOwnProperty('date') || req.params.date === undefined) 
    {
      //console.log("no date")
      let utcDate = new Date().toUTCString();
      let unixDate = new Date().getUnixTime();
      res.json({ unix: unixDate, utc: utcDate });
    }
    else  
    {
      let dateCheck = new Date(req.params.date);
      let numDateCheck = new Date(Number(req.params.date));
      if (isValidDate(dateCheck) || isValidDate(numDateCheck)){
        console.log(dateCheck, req.params.date);
        if (req.params.date.length === 13 && typeof(+req.params.date) === "number") 
        {
          let date = Number(req.params.date);
          let utcDate = new Date(date).toUTCString();
          let unixDate = new Date(date).getUnixTime();
          res.json({unix: unixDate, utc: utcDate});
        }
        else
        {
          date = req.params.date;
          let utcDate = new Date(date).toUTCString();
          let unixDate = new Date(date).getUnixTime();
          res.json({unix: unixDate, utc: utcDate});
        }
      }
      else 
      {
        console.log(req.params.date);
        throw ("Invalid Date");
      }
    }
  }
  catch (err) 
  {
    console.log(err);
    res.json({error: "Invalid Date"})
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});


