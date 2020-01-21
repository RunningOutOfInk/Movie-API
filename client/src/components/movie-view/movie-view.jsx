import React from 'react';
import axios from 'axios';

export class MovieView extends React.Component {
  constructor() {
    super();

    this.state = null;
  }

  render() {
    const { movie, onClick } = this.props;

    if (!movie) return null;

    return (
      <div className="movie-view">
        <img className="movie-poster" src={movie.ImagePath} />
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.Title}</span>
        </div>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>
        <div className="movie-genre">
          <span className="label">Genres: </span>
          <span className="value">{movie.moviegenredetails.Name}</span>
        </div>
        <div className="movie-director">
          <span className="label">Director: </span>
          <span className="value">{movie.moviedirectordetails.Name}</span>
        </div>
        <button onClick={() => onClick()} className="back-button">Back</button>
      </div>
    );
  }
}