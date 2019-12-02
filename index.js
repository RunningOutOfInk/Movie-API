const express = require('express'),
  morgan = require('morgan'),
  bodyParser = require("body-parser"),
  uuid = require("uuid"),
  mongoose = require('mongoose'),
  Models = require('./models.js'),
  Movies = Models.Movie,
  Users = Models.User,
  Genres = Models.Genre,
  Directors = Models.Director,
  passport = require('passport');

require('./passport');

mongoose.connect('mongodb://localhost:27017/myFlixDB', {useNewUrlParser: true});

const app = express();

//Middleware Requests
//Logging
app.use(morgan('common'));
//JSON Parsing
app.use(bodyParser.json());
//User Auth
var auth = require('./auth')(app);
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

//Gets a list of movies - Mongoose .find()
app.get('/movies', function(req, res) {
  Movies.find().then(movies => res.json(movies));
});

//Gets the data about a single movie by title
app.get("/movies/:Title", function(req, res) {
  Movies.findOne({ Title : req.params.Title })
  .then(function(movie) {
    res.json(movie)
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error: " + err)
  });
  });

//Gets description of a genre by genre name
app.get("/genres/:Genre", function(req, res) {
  Genres.findOne({ Name : req.params.Genre })
  .then(function(genre) {
    res.json(genre.Description)
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error: " + err)
  });
});

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
app.get("/directors/:Name", function(req, res) {
  Directors.findOne({ Name : req.params.Name })
  .then(function(director) {
    res.json(director)
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error: " + err)
  });
});

//Adds data for a new movie to the list of movies
app.post("/movies", (req, res) => {
//   let newMovie = req.body;
//   if (!newMovie.title) {
//     const message = "Missing title in request body";
//     res.status(400).send(message);
//   } else {
//     newMovie.id = uuid.v4();
//     topMovies.push(newMovie);
//     res.status(201).send(newMovie);
// }
});

//Deletes a movie from the list by title
app.delete("/movies/:title", (req, res) => {
  // let movie = topMovies.find((movie) => { return movie.title === req.params.title });
  //
  // if (movie) {
  //   topMovies.filter(function(obj) { return obj.title !== req.params.title });

  // res.status(201).send("Movie " + req.params.title + " was deleted.")
// }
});

//Gets all users - Mongoose .find()
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

//Gets a user by username - Mongoose  .findOne()
app.get('/users/:Username', function(req, res) {
  Users.findOne({ Username : req.params.Username })
  .then(function(user) {
    res.json(user)
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error: " + err)
  });
});

//Posts a new user - Mongoose .create()
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
      .then(function(user) {res.status(201).json(user) }) //new document 'user' sent back to client with status code
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

//Updates user info by username - Mongoose Update - different syntax from the others
//If you don't include all the information from the collection in the update statement, it sets those values to null? Will need to change that
//Also need to check that the updated Username is not duplicated (and probably Email)
app.put("/users/:Username", function(req, res) {
  Users.findOneAndUpdate({ Username : req.params.Username }, { $set :
    {
      Username : req.body.Username,
      Password : req.body.Password,
      Email : req.body.Email,
      Birthday : req.body.Birthday
    }},
    { new : true }, //Makes sure updated document is returned
    function(err, updatedUser) {
      if(err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser)
      }
    })
});

//Adds a movie to a list of user favorites - Mongoose - same syntax as Update User Info
//Needs the MovieID - would need logic to derive the ID from the movie Title
app.post("/users/:Username/Movies/:MovieID", function(req, res) {
  Users.findOneAndUpdate({ Username : req.params.Username }, {
    $push : { FavoriteMovies : req.params.MovieID }
  },
  { new : true },
  function(err, updatedUser) {
    if(err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    } else {
      res.json(updatedUser)
    }
  })
});

//Removes a movie from a list of favorites - Mongoose Delete
app.delete("/users/:Username/Movies/:MovieID", function(req, res) {
  Users.findOneAndUpdate({ Username : req.params.Username }, {
    $pull : { FavoriteMovies : req.params.MovieID }
  },
  { new : true },
  function(err, updatedUser) {
    if(err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    } else {
      res.json(updatedUser)
    }
  })
});

//Removes a user
app.delete("/users/:Username", function(req, res) {
  Users.findOneAndRemove({ Username : req.params.Username })
  .then(function(user) {
    if(!user) {
      res.status(400).send(req.params.Username + " was not found!");
    } else {
      res.status(200).send(req.params.Username + " was deleted!");
    }
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});

//Listen for requests
app.listen(8080, () =>
  console.log('Your app is listening on Port 8080.')
);
