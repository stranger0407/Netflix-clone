import React, { useEffect, useRef, useState } from 'react';
import '../TitleCards/TitleCards.css'; // Reusing the same CSS
import { Link } from 'react-router-dom';

const TVShowCards = ({ title, category, customClass, limit }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZWE0M2FkNmViZjYzMTUxMDAwMWVhZDI0NGJiOGM0ZSIsIm5iZiI6MTczNzg3OTI4Ni42MjIwMDAyLCJzdWIiOiI2Nzk1ZWVmNjA5YzI1MmUzYWIyMzllNGQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.rbddtb5arHDX30BFa4I0TmJtA-fB6MBMbPdkMoyr4_U'
    }
  };

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  const scrollLeft = () => {
    cardsRef.current.scrollBy({ left: -cardsRef.current.offsetWidth / 2, behavior: 'smooth' });
  };

  const scrollRight = () => {
    cardsRef.current.scrollBy({ left: cardsRef.current.offsetWidth / 2, behavior: 'smooth' });
  };

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    // Use TV shows endpoint instead of movies
    fetch(`https://api.themoviedb.org/3/tv/${category ? category : "popular"}?language=en-US&page=1`, options)
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch TV shows');
        }
        return res.json();
      })
      .then(res => {
        setApiData(res.results);
        setIsLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Error loading TV shows');
        setIsLoading(false);
      });

    if (cardsRef.current) {
      cardsRef.current.addEventListener('wheel', handleWheel);
    }
    
    return () => {
      if (cardsRef.current) {
        cardsRef.current.removeEventListener('wheel', handleWheel);
      }
    };
  }, [category]);

  // Apply limit to displayed cards if provided
  const displayData = limit ? apiData.slice(0, limit) : apiData;

  if (isLoading) {
    return (
      <div className={`title-cards ${customClass || ''}`}>
        <h2>{title ? title : "Popular TV Shows"}</h2>
        <div className="loading-container">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`title-cards ${customClass || ''}`}>
        <h2>{title ? title : "Popular TV Shows"}</h2>
        <div className="error-container">
          <p className="error-message">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`title-cards ${customClass || ''}`}>
      <h2>{title ? title : "Popular TV Shows"}</h2>
      <div className="cards-container">
        <button className="nav-arrow left-arrow" onClick={scrollLeft}>
          ‹
        </button>
        <div className="card-list" ref={cardsRef}>
          {displayData.map((show, index) => {
            return (
              <Link to={`/tvshow/${show.id}`} className="card" key={index}>
                <div className="card-inner">
                  <img 
                    src={`https://image.tmdb.org/t/p/w500${show.backdrop_path || show.poster_path}`} 
                    alt={show.name} 
                  />
                  <div className="card-overlay">
                    <h3 className="card-title">{show.name}</h3>
                    <div className="card-info">
                      <span className="rating">{Math.round(show.vote_average * 10) / 10}</span>
                      <span className="year">{show.first_air_date?.substring(0, 4)}</span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        <button className="nav-arrow right-arrow" onClick={scrollRight}>
          ›
        </button>
      </div>
    </div>
  );
};

export default TVShowCards;