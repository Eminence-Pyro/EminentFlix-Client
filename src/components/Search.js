// client/src/components/Search.js
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Search.css';

const Search = () => {
  const [query, setQuery] = useState('');
  const [year, setYear] = useState('');
  const [minRating, setMinRating] = useState('');
  const [sortBy, setSortBy] = useState('popularity.desc');
  const [results, setResults] = useState([]);

  const searchMovies = async (e) => {
    e.preventDefault();
    const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

    let url;
    if (query) {
      url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`;
    } else {
      url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=${sortBy}`;
      if (year) url += `&primary_release_year=${year}`;
      if (minRating) url += `&vote_average.gte=${minRating}`;
    }

    try {
      const res = await axios.get(url);
      setResults(res.data.results);
    } catch (err) {
      console.error('Error fetching movies:', err);
    }
  };

  return (
    <div className="search-container">
      <h2 className="search-title">🎬 Welcome to EminentFlix</h2>
      <form onSubmit={searchMovies} className="search-form">
        <input
          type="text"
          placeholder="Search title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <input
          type="text"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <input
          type="number"
          placeholder="Min Rating"
          value={minRating}
          onChange={(e) => setMinRating(e.target.value)}
          min="0" max="10" step="0.1"
        />
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="popularity.desc">Popularity</option>
          <option value="vote_average.desc">Rating</option>
          <option value="release_date.desc">Release Date</option>
        </select>
        <button type="submit">Search</button>
      </form>

      <div className="movie-grid">
        {results.map(movie => (
          <Link to={`/movie/${movie.id}`} key={movie.id} className="movie-card">
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
        ))}
      </div>
    </div>
  );
};

export default Search;
