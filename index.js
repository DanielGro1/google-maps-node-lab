const express = require('express');
const app = express();
const url = require('url');
const dt = require('./date-time');

const port = process.env.PORT || 3000;
const majorVersion = 1;
const minorVersion = 2;

// ✅ Serve static files (HTML, CSS, JS)
app.use(express.static(__dirname + '/static'));

// ✅ Serve index.html on root URL
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/static/index.html');
});

// Custom About page
app.get('/about', (request, response) => {
  console.log('Calling "/about" on the Node.js server.');
  response.type('text/plain');
  response.send('About Node.js on Azure Template.');
});

app.get('/version', (request, response) => {
  console.log('Calling "/version" on the Node.js server.');
  response.type('text/plain');
  response.send('Version: ' + majorVersion + '.' + minorVersion);
});

app.get('/2plus2', (request, response) => {
  console.log('Calling "/2plus2" on the Node.js server.');
  response.type('text/plain');
  response.send('4');
});

app.get('/add-two-integers', (request, response) => {
  console.log('Calling "/add-two-integers" on the Node.js server.');
  var inputs = url.parse(request.url, true).query;
  let x = parseInt(inputs.x);
  let y = parseInt(inputs.y);
  let sum = x + y;
  response.type('text/plain');
  response.send(sum.toString());
});

app.get('/calculate-bmi', (request, response) => {
  console.log('Calling "/calculate-bmi" on the Node.js server.');
  var inputs = url.parse(request.url, true).query;
  const heightFeet = parseInt(inputs.feet);
  const heightInches = parseInt(inputs.inches);
  const weight = parseInt(inputs.lbs);

  console.log('Height:' + heightFeet + '\'' + heightInches + '\"');
  console.log('Weight:' + weight + ' lbs.');

  response.type('text/plain');
  response.send('Todo: Implement "/calculate-bmi"');
});

app.get('/test', (request, response) => {
  console.log(request);

  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write('<h3>Testing Function</h3>');
  response.write("The date and time are currently: " + dt.myDateTime() + "<br><br>");
  response.write("req.url=" + request.url + "<br><br>");
  response.write("Consider adding '/test?year=2017&month=July' to the URL.<br><br>");

  var q = url.parse(request.url, true).query;
  var txt = q.year + " " + q.month;
  response.write("txt=" + txt);
  response.end('<h3>The End.</h3>');
});

// JSON example
var spiderMan = {
  "firstName": "Bruce",
  "lastName": "Wayne",
  "preferredName": "Batman",
  "email": "darkknight@lewisu.edu",
  "phoneNumber": "800-bat-mann",
  "city": "Gotham",
  "state": "NJ",
  "zip": "07101",
  "lat": "40.73",
  "lng": "-74.17",
  "favoriteHobby": "Flying",
  "class": "cpsc-24700-001",
  "room": "AS-104-A",
  "startTime": "2 PM CT",
  "seatNumber": "",
  "inPerson": ["Monday", "Wednesday"],
  "virtual": ["Friday"]
};

app.get('/batman', (request, response) => {
  console.log('Calling "/batman" on the Node.js server.');
  response.type('application/json');
  response.send(JSON.stringify(spiderMan, null, 4));
});

// Custom 404 page
app.use((request, response) => {
  response.type('text/plain');
  response.status(404);
  response.send('404 - Not Found');
});

// Custom 500 page
app.use((err, request, response, next) => {
  console.error(err.message);
  response.type('text/plain');
  response.status(500);
  response.send('500 - Server Error');
});

// Start server
app.listen(port, () => {
  console.log(`Express started at \"http://localhost:${port}\"\npress Ctrl-C to terminate.`);
});
