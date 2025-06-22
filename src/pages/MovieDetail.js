import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './MovieDetail.css';

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`);
        setMovie(res.data);
      } catch (err) {
        console.error('Error fetching movie details:', err);
      }
    };
    fetchMovie();
  }, [id]);

  const saveToFavorites = async () => {
    if (!token) {
      alert('Please log in to save favorites.');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/movies/favorite', {
        movieId: movie.id,
        title: movie.title,
        posterPath: movie.poster_path,
        releaseDate: movie.release_date,
        voteAverage: movie.vote_average,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Movie saved to favorites!');
    } catch (err) {
      alert('Failed to save favorite.');
      console.error(err);
    }
  };

  if (!movie) return <p className="loading">Loading movie details…</p>;

  return (
    <div className="movie-detail-container">
      <h2>{movie.title}</h2>
      {movie.poster_path && (
        <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} className="movie-poster" />
      )}
      <p><strong>Overview:</strong> {movie.overview}</p>
      <p><strong>Release Date:</strong> {movie.release_date}</p>
      <p><strong>Rating:</strong> {movie.vote_average}</p>
      <button className="save-button" onClick={saveToFavorites}>❤️ Save to Favorites</button>
      <p><Link to="/">← Back to search</Link></p>
    </div>
  );
};

export default MovieDetail;
