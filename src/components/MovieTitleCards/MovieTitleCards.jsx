import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MovieTitleCards.css';

const MovieTitleCards = ({ title, category }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZWE0M2FkNmViZjYzMTUxMDAwMWVhZDI0NGJiOGM0ZSIsIm5iZiI6MTczNzg3OTI4Ni42MjIwMDAyLCJzdWIiOiI2Nzk1ZWVmNjA5YzI1MmUzYWIyMzllNGQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.rbddtb5arHDX30BFa4I0TmJtA-fB6MBMbPdkMoyr4_U'
    }
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        let endpoint;
        
        // Standard categories
        if (['popular', 'top_rated', 'now_playing', 'upcoming'].includes(category)) {
          endpoint = `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`;
        } 
        // Genre ID was passed (like 28 for action)
        else if (!isNaN(category)) {
          endpoint = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${category}`;
        }
        // Genre name was passed
        else {
          // Fetch genres first to get ID
          const genresResponse = await fetch(
            'https://api.themoviedb.org/3/genre/movie/list?language=en-US',
            options
          );
          
          if (!genresResponse.ok) {
            throw new Error('Failed to fetch genres');
          }
          
          const genresData = await genresResponse.json();
          const genreId = genresData.genres.find(
            genre => genre.name.toLowerCase() === category.toLowerCase()
          )?.id;
          
          if (genreId) {
            endpoint = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genreId}`;
          } else {
            // Fallback to popular
            endpoint = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
          }
        }
        
        const response = await fetch(endpoint, options);
        
        if (!response.ok) {
          throw new Error('Failed to fetch movies');
        }
        
        const data = await response.json();
        setMovies(data.results.slice(0, 10)); // Limit to 10 movies
      } catch (error) {
        console.error('Error fetching movies:', error);
        setMovies([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [category]);

  const handleMovieClick = (movieId) => {
    navigate(`/player/${movieId}`);
  };

  return (
    <div className="movie-title-cards-container">
      <h3 className="movie-category">{title}</h3>
      
      <div className="movie-cards-row">
        {loading ? (
          <div className="movie-loading">Loading...</div>
        ) : movies.length > 0 ? (
          movies.map(movie => (
            <div 
              key={movie.id} 
              className="movie-card"
              onClick={() => handleMovieClick(movie.id)}
            >
              <img 
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                alt={movie.title} 
                className="movie-poster"
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = "https://via.placeholder.com/300x450?text=No+Image";
                }}
              />
              <div className="movie-info">
                <h4>{movie.title}</h4>
                <div className="movie-details">
                  <span className="movie-year">
                    {movie.release_date ? movie.release_date.substring(0, 4) : "N/A"}
                  </span>
                  <span className="movie-rating">
                    ⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="movie-no-results">No movies found</div>
        )}
      </div>
    </div>
  );
};

export default MovieTitleCards;