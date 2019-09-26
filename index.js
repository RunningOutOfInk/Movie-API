const express = require('express');
const app = express();

let topBooks = [ {
  title: 'Harry Potter and the Sorcerer\'s Stone',
  author: 'J.K. Rowling'
},
{
  title: 'Assassin\'s Apprentice',
  author: 'Robin Hobb'
},
{
  title: 'Daughter of the Forest',
  author: 'Juliet Marillier'
}]

//Middleware functions
var myLogger = function (req, res, next) {
  console.log(req.url);
  next();
};

var requestTime = function (req, res, next) {
  req.requestTime = Date.now();
  next();
};

//GET Requests
app.use(myLogger);
app.use(requestTime);
app.get('/', function(req, res) {
  var responseText = 'Welcome to my app!'
  responseText += '<small> Requested at: ' + req.requestTime + '</small>';
  res.send(responseText)
});
app.get('/documentation', function(req, res) {
  res.sendFile('documentation.html', { root : __dirname });
});
app.get('/books', function(req, res) {
  res.json(topBooks)
});

//Listen for requests
app.listen(8080, () =>
  console.log('Your app is listening on Port 8080.')
);
