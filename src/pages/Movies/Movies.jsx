import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import MovieTitleCards from '../../components/MovieTitleCards/MovieTitleCards';
import Footer from '../../components/Footer/Footer';
import './Movies.css';

const Movies = () => {
  return (
    <div className="movies">
      <Navbar />
      
      <div className="movies-content">
        <div className="page-header">
          <h1>Movies</h1>
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
        
        <div className="movies-grid">
          <MovieTitleCards title="Popular Movies" category="popular" />
          <MovieTitleCards title="Top Rated Films" category="top_rated" />
          <MovieTitleCards title="New Releases" category="now_playing" />
          <MovieTitleCards title="Coming Soon" category="upcoming" />
          <MovieTitleCards title="Action Blockbusters" category="28" /> {/* 28 is action genre id */}
          <MovieTitleCards title="Award-Winning Films" category="top_rated" />
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Movies;