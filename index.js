const express = require('express'),
  morgan = require('morgan'),
  bodyParser = require("body-parser"),
  uuid = require("uuid"),
  mongoose = require('mongoose'),
  Models = require('./models.js'),
  Movies = Models.Movie,
  Users = Models.User;

mongoose.connect('mongodb://localhost:27017/myFlixDB', {useNewUrlParser: true});

const app = express();

//Middleware Requests
//Logging
app.use(morgan('common'));
//User Auth
//JSON Parsing
app.use(bodyParser.json());
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
  //res.json(topMovies)
  //Mongoose promise Function
  //Movies.find().then()
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
app.get("/movies/genres/:genre", (req, res) => {

  //Mongoose callback function
  //Movies.find( { "Genre.Name" : "Thriller" }, function(err, movies) {
    //Logic here
  //} );

  //Mongoose promise function
  //Movies.find( { "Genre.Name" : "Thriller" }).then(function(movies) {
    //Logic here
  //});

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

//Gets all users - Mongoose
app.get('/users', function(req, res) {
  Users.find()
  .then(function(users) {
    res.status(201).json(users)
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});

//Gets a user by username - Mongoose
app.get('/users/:Username', function(req, res) {
  Users.findOne({ Username : req.params.Username})
  .then(function(user) {
    res.json(user)
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error: " + err)
  });
});

//Posts a new user - Mongoose
app.post('/users', function(req, res) {
  Users.findOne({ Username : req.body.Username }) //Query db to see if user already exists
  .then(function(user) {
    if (user) { //if username already exists
      return res.status(400).send(req.body.Username + "already exists!");
    } else { //Username does not exist; create
      Users
      .create({
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday
      })
      .then(function(user) {res.status(201).json(user) }) //callback; new document 'user' sent back to client with status code
      .catch(function(error) {
        console.error(error);
        res.status(500).send("Error: " + error);
      })
    }
  }).catch(function(error) {
    console.error(error);
    res.status(500).send("Error: " + error);
  });
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
