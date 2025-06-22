import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import BackgroundSlider from '../components/BackgroundSlider';
import './Auth.css';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);
      const { token, user } = res.data;

      if (rememberMe) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('user', JSON.stringify(user));
      }

      alert('Login successful!');
      navigate('/');
    } catch (err) {
      alert('Invalid login');
      console.error(err);
    }
  };

  return (
    <div className="auth-wrapper">
      <BackgroundSlider darken />
      <div className="auth-form-box">
        <h2>Welcome Back</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <input
            name="email"
            type="text"
            placeholder="Email or Username"
            onChange={handleChange}
            required
          />
          <div className="password-group">
            <input
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              onChange={handleChange}
              required
            />
            <span onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? '🙈' : '👁️'}
            </span>
          </div>

          <button type="submit">Login</button>
        </form>
        <div className="auth-options">
            <label className="remember-me">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              Remember Me
            </label>
            <p className="auth-toggle">
          Don’t have an account? <Link to="/register">Register</Link></p>
          </div>
      </div>
    </div>
  );
};

export default Login;