import React from 'react';
import { Link } from 'react-router-dom';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movie/${movie.id}`} className="movie-card">
      {movie.poster_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
          alt={movie.title}
        />
      ) : (
        <div className="no-image">No Image</div>
      )}
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>⭐ {movie.vote_average}</p>
        <p>📅 {movie.release_date?.slice(0, 4)}</p>
      </div>
    </Link>
  );
};

export default MovieCard;
