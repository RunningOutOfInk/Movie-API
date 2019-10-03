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

//Requests
app.get('/', function(req, res) {
  var responseText = 'Welcome to my app about movies!!'
  res.send(responseText);
});

//Gets a list of movies
app.get('/movies', function(req, res) {
  res.json(topMovies)
});

//Gets the data about a single movie by title
app.get("/movies/:title", (req, res) => {
  res.json(topMovies.find( (movie) =>
    { return movie.title === req.params.title }));
});

//Gets description of a genre by genre name
app.get("/genres/:genre", (req, res) => {
  res.send('Successful GET request returning description of a genre.');
})

//Gets a list of movies by genre
app.get("/movies/:genre", (req, res) => {
  res.send('Successful GET request returning list of movies by genre.');
})

//Gets data about a director by name
app.get("/directors/:name", (req, res) => {
  res.send('Successful GET request returning data about a director.');
})

//Adds data for a new movie to the list of movies
app.post("/movies", (req, res) => {
  let newMovie = req.body;

  if (!newMovie.title) {
    const message = "Missing title in request body";
    res.status(400).send(message);
  } else {
    newMovie.id = uuid.v4();
    topMovies.push(newMovie);
    res.status(201).send(newMovie);
  }
});

//Deletes a movie from the list by title
app.delete("/movies/:title", (req, res) => {
  let movie = topMovies.find((movie) => { return movie.title === req.params.title });

  if (movie) {
    topMovies.filter(function(obj) { return obj.title !== req.params.title });

  res.status(201).send("Movie " + req.params.title + " was deleted.")
  }
});

//Posts a new user
app.post("/users", function(req, res) {
   res.send('Successful POST request adding a new user.');
});

//Updates user info by username
app.put("/users/:username", (req, res) => {
  res.send('Successful PUT request updating info about a user.');
});

//Adds a movie to a list of user favorites
app.post("/users/:username/:title", (req, res) => {
  res.send('Successful POST adding a movie to a list of favorites.');
});

//Removes a movie from a list of favorites
app.delete("/users/:username/:title", (req, res) => {
  res.send('Successful DELETE request removing a movie from a list of favorites.');
});

//Removes a user
app.delete("/users/:username", (req, res) => {
  res.send('Successful DELETE request removing a user.');
})

//Listen for requests
app.listen(8080, () =>
  console.log('Your app is listening on Port 8080.')
);
