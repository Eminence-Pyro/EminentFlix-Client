import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard'; // ✅ New reusable component
import './Home.css';

const Home = () => {
  const [query, setQuery] = useState('');
  const [year, setYear] = useState('');
  const [minRating, setMinRating] = useState('');
  const [sortBy, setSortBy] = useState('popularity.desc');
  const [results, setResults] = useState([]);

  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

  // ✅ Load popular movies on page load
  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
        );
        setResults(res.data.results);
      } catch (err) {
        console.error('Error loading popular movies:', err);
      }
    };

    fetchPopularMovies();
  }, [API_KEY]);

  // 🔍 Run when user submits search
  const searchMovies = async (e) => {
    e.preventDefault();

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
      console.error('Error searching for movies:', err);
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
        {results.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Home;
