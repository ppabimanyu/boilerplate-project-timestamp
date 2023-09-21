// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

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
  res.json({ greeting: 'hello API' });
});

app.get('/api/:date?', (req, res) => {
  // Get the date parameter from the request
  const date = req.params.date;

  // If the date parameter is empty, return the current time
  if (!date) {
    const now = new Date();
    res.json({
      unix: now.getTime(),
      utc: now.toUTCString()
    });
    return;
  }

  // Try to parse the date parameter
  try {
    let parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      parsedDate = new Date(parseInt(date));
      if (isNaN(parsedDate.getTime())) {
        throw new Error()
      }
    }

    // Calculate the Unix timestamp
    const unixTimestamp = parsedDate.getTime();
    // Generate the UTC string
    const utcString = parsedDate.toUTCString();

    // Return the JSON response
    res.json({
      unix: unixTimestamp,
      utc: utcString
    });
  } catch (error) {
    // If the date parameter is invalid, return an error response
    res.status(400).json({
      error: 'Invalid Date'
    });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});

