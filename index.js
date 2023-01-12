// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

const PORT = process.env.PORT || 3000

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res)=> {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api", (req, res) =>{
  res.json({unix: Date.now(), utc: new Date().toUTCString()})
}) 


app.get("/api/:date", (req, res) => {
  let {date} = req.params;
  if (/\d{5,}/.test(date)) {
    let dateInt = parseInt(date);
    let day =  new Date(dateInt)
    res.json({ unix: dateInt, utc: day.toUTCString() });
  } else {
    let dateObject = new Date(date);

    if (dateObject.toString() === "Invalid Date") {
      res.json({ error: "Invalid Date" });
    }else {
      res.json({ unix: dateObject.valueOf(), utc: dateObject.toUTCString() });
    }
    
  }
});

// listen for requests :)
var listener = app.listen(PORT, function () {
  console.log('Your app is listening on port ' + PORT);
});
