import React from 'react';
import axios from 'axios';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';

export class MainView extends React.Component {

  // One of the "hooks" available in a React Component
  constructor(props) {
    super(props);

    this.state = {
      movies: null,
      selectedMovie: null,
      user: null,
      register: false
    };
  }

  componentDidMount() {
    axios.get('https://nienhuisflixapp.herokuapp.com/movies')
      .then(response => {
        // Assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  //onClick event will set selectedMovie variable to a movie if a movie is passed into the function called by onClick
  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  //onLoggedIn event will set the state to the user variable
  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  //onNewUser event will set the state to the register variable
  onNewUser() {
    this.setState({
      register: true
    });
  }

  render() {
    // If the state isn't initialized, this will throw on runtime
    // before the data is initially loaded
    const { movies, selectedMovie, user, register } = this.state;

    //When user is null, display LoginView; else, move on
    //Pass props to LoginView so that LoginView component can update the Main-View state to either Logged In or New User
    if (!user && !register) return (
      <LoginView
        onLoggedIn={user => this.onLoggedIn(user)}
        onNewUser={() => this.onNewUser()}
      />
    );

    // When Register is set, then display Registration view
    if (register && !user) return <RegistrationView onLoggedIn={user => this.onLoggedIn(user)} />

    // Before the movies have been loaded
    if (!movies) return <div className="main-view" />;

    if (user) return (
      <div className="main-view">
        {selectedMovie
          ? <MovieView movie={selectedMovie} onClick={() => this.onMovieClick(null)} />
          : movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)} />
          ))
        }
      </div>
    );
  }
}
