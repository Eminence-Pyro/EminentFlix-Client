import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import BackgroundSlider from '../components/BackgroundSlider';
import './Auth.css';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      return alert("Passwords do not match.");
    }

    try {
      await axios.post('http://localhost:5000/api/auth/register', form);
      alert('Registration successful! Please login.');
      navigate('/login');
    } catch (err) {
      alert('Error registering');
      console.error(err);
    }
  };

  return (
    <div className="auth-wrapper">
      <BackgroundSlider darken/>
      <div className="auth-form-box">
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <input name="name" placeholder="Username" onChange={handleChange} required />
          <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
          <div className="password-group">
            <input name="password" type={showPassword ? 'text' : 'password'} placeholder="Password" onChange={handleChange} required />
            <span onClick={() => setShowPassword(!showPassword)}>{showPassword ? '🙈' : '👁️'}</span>
          </div>
          <div className="password-group">
            <input name="confirmPassword" type={showPassword ? 'text' : 'password'} placeholder="Confirm Password" onChange={handleChange} required />
          </div>
          <button type="submit">Register</button>
        </form>
        <p className="auth-toggle">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;