import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate(); // Move navigate to the top
  

  const Register = () => {
    navigate('/signup');  // Navigate to the signup page
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      console.log(response.data);
      localStorage.setItem('token', response.data.token); // Store the token in localStorage
      navigate('/test');  // Use navigate for routing in React Router v6

      // Clear the input fields after successful login
      setEmail('');
      setPassword('');

    } catch (error) {
      console.log(error.message);
      setError('Invalid credentials. Please try again.');  // Set error if login fails
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}> {/* Bind handleSubmit to form submission */}
        <label>Email :</label>
        <input 
          type="email" 
          placeholder="Enter your email" 
          required 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} // Bind email state to input
        />

        <label>Password :</label>
        <input 
          type="password" 
          placeholder="Enter your password" 
          required 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} // Bind password state to input
        />

        <button type="submit">Login</button>
        {error && <p className="error">{error}</p>} {/* Display error message if exists */}

        <p className="link-account">
          Don't have an account? 
          <button type="button" onClick={Register}>Register</button>
        </p>
      </form>
    </div>
  );
};

export default Login;
