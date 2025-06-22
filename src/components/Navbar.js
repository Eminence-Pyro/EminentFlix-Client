import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    alert('You’ve been logged out.');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="EminentFlix Logo" className="logo" />
        <Link to="/" className="app-name">EminentFlix</Link>
        {token && <Link to="/favorites" className="nav-link">Favorites</Link>}
      </div>
      <div className="navbar-right">
        {!token ? (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="nav-link">Register</Link>
          </>
        ) : (
          <>
            <span className="username">👤 {user?.name}</span>
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
