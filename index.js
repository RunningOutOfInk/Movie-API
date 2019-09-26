const express = require('express'),
  morgan = require('morgan');

const app = express();

let topMovies = [
{ //1
  title: 'Stardust',
  releaseYear: '2007'
},
{ //2
  title: 'Penelope',
  releaseYear: '2006'
},
{ //3
  title: 'V For Vendetta',
  releaseYear: '2005'
},
{ //4
  title: 'Mona Lisa Smile',
  releaseYear: '2003'
},
{ //5
  title: 'Spider-Man: Into the Spider-Verse',
  releaseYear: '2018'
},
{ //6
  title: 'Bolt',
  releaseYear: '2008'
},
{ //7
  title: 'Scott Pilgrim vs. The World',
  releaseYear: '2010'
},
{ //8
  title: 'Castle in the Sky',
  releaseYear: '1986'
},
{ //9
  title: 'Pride and Prejudice',
  releaseYear: '2005'
},
{ //10
  title: 'The Blind Side',
  releaseYear: '2009'
}
]

//Middleware Requests
//Logging
app.use(morgan('common'));
//User Auth
//JSON Parsing
//Static files
app.use(express.static('public'));
//App Routing -- always last
//Error Handling -- actually last of all middleware
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Uh-oh! Something\'s not right!');
});

//GET Requests
app.get('/', function(req, res) {
  var responseText = 'Welcome to my app!'
  res.send(responseText);
});
app.get('/movies', function(req, res) {
  res.json(topMovies)
});

//Listen for requests
app.listen(8080, () =>
  console.log('Your app is listening on Port 8080.')
);
