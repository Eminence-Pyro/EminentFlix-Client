import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Favorites.css';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/movies/favorites', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFavorites(res.data);
      } catch (err) {
        console.error('Error fetching favorites:', err);
      }
    };
    fetchFavorites();
  }, [token]);

  return (
    <div className="favorites-container">
      <h2>My Favorite Movies</h2>
      {favorites.length === 0 ? (
        <p>You haven’t saved any favorites yet.</p>
      ) : (
        <div className="favorites-grid">
          {favorites.map(movie => (
            <div key={movie._id} className="favorite-card">
              {movie.posterPath ? (
                <img src={`https://image.tmdb.org/t/p/w200${movie.posterPath}`} alt={movie.title} className="favorite-poster" />
              ) : (
                <div className="no-image">No Image</div>
              )}
              <h4>{movie.title}</h4>
              <p>⭐ {movie.voteAverage}</p>
              <p>📅 {movie.releaseDate?.slice(0, 4)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
