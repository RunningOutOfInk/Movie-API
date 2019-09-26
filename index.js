const express = require('express'),
  morgan = require('morgan');

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


//Middleware Requests
//Logging
app.use(morgan('common'));
//User Auth
//JSON Parsing
//Static files
//App Routing -- always last

app.use(express.static('public'));

//GET Requests
app.get('/', function(req, res) {
  var responseText = 'Welcome to my app!'
  res.send(responseText);
});
app.get('/books', function(req, res) {
  res.json(topBooks)
});

//Listen for requests
app.listen(8080, () =>
  console.log('Your app is listening on Port 8080.')
);
