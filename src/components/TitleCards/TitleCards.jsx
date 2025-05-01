import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import { Link } from 'react-router-dom';

const TitleCards = ({ title, category, customClass, limit }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

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
  }

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`, options)
      .then(res => res.json())
      .then(res => setApiData(res.results))
      .catch(err => console.error(err));

    cardsRef.current.addEventListener('wheel', handleWheel);
    
    return () => {
      if (cardsRef.current) {
        cardsRef.current.removeEventListener('wheel', handleWheel);
      }
    }
  }, [category]);

  // Apply limit to displayed cards if provided
  const displayData = limit ? apiData.slice(0, limit) : apiData;

  return (
    <div className={`title-cards ${customClass || ''}`}>
      <h2>{title ? title : "Popular On Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {displayData.map((card, index) => {
          return (
            <Link to={`/player/${card.id}`} className="card" key={index}>
              <div className="card-inner">
                <img src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path} alt="" />
                <div className="card-overlay">
                  <h3 className="card-title">{card.original_title}</h3>
                  <div className="card-info">
                    <span className="rating">{Math.round(card.vote_average * 10) / 10}</span>
                    <span className="year">{card.release_date?.substring(0, 4)}</span>
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default TitleCards