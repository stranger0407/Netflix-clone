import React from 'react';
import './NotFound.css';
import { Link } from 'react-router-dom';
import netflix_logo from '../../assets/logo.png';

const NotFound = () => {
  return (
    <div className="not-found">
      <img src={netflix_logo} alt="Netflix" className="not-found-logo" />
      <h1>Lost your way?</h1>
      <p>Sorry, we can't find that page. You'll find lots to explore on the home page.</p>
      <Link to="/" className="home-button">Netflix Home</Link>
      <div className="error-code">
        Error Code: NSES-404
      </div>
    </div>
  );
};

export default NotFound;