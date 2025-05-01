import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import TVShowCards from '../../components/TVShowCards/TVShowCards';
import Footer from '../../components/Footer/Footer';
import './TVShows.css';

const TVShows = () => {
  return (
    <div className="tv-shows">
      <Navbar />
      
      <div className="tv-shows-content">
        <div className="page-header">
          <h1>TV Shows</h1>
          <div className="genre-selector">
            <select name="genre" id="genre">
              <option value="">Genres</option>
              <option value="action">Action</option>
              <option value="comedy">Comedy</option>
              <option value="drama">Drama</option>
              <option value="sci-fi">Sci-Fi</option>
              <option value="fantasy">Fantasy</option>
              <option value="documentary">Documentary</option>
            </select>
          </div>
        </div>
        
        <div className="tv-shows-grid">
          <TVShowCards title="Popular on Netflix" category="popular" />
          <TVShowCards title="Trending Now" category="airing_today" />
          <TVShowCards title="Top Rated Shows" category="top_rated" />
          <TVShowCards title="Sci-Fi & Fantasy" category="on_tv" />
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default TVShows;