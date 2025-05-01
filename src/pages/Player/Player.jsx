import React, { useEffect, useState } from 'react';
import './Player.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png';
import { useNavigate, useParams } from 'react-router-dom';
import netflix_spinner from '../../assets/netflix_spinner.gif';

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: ""
  });

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZWE0M2FkNmViZjYzMTUxMDAwMWVhZDI0NGJiOGM0ZSIsIm5iZiI6MTczNzg3OTI4Ni42MjIwMDAyLCJzdWIiOiI2Nzk1ZWVmNjA5YzI1MmUzYWIyMzllNGQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.rbddtb5arHDX30BFa4I0TmJtA-fB6MBMbPdkMoyr4_U'
    }
  };

  const navigateBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, 
          options
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch video data');
        }
        
        const data = await response.json();
        
        if (data.results && data.results.length > 0) {
          setApiData(data.results[0]);
          setError(null);
        } else {
          throw new Error('No video available for this title');
        }
      } catch (err) {
        console.error('Error fetching video:', err);
        setError(err.message || 'Failed to load video. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchVideoData();
  }, [id]);

  if (loading) {
    return (
      <div className="player loading-state">
        <img src={back_arrow_icon} alt="Back" className="back-button" onClick={navigateBack} />
        <div className="loading-container">
          <img src={netflix_spinner} alt="Loading..." className="spinner" />
          <p>Loading video...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="player error-state">
        <img src={back_arrow_icon} alt="Back" className="back-button" onClick={navigateBack} />
        <div className="error-container">
          <p className="error-message">{error}</p>
          <button className="retry-button" onClick={() => window.location.reload()}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="player">
      <img 
        src={back_arrow_icon} 
        alt="Back" 
        className="back-button" 
        onClick={navigateBack} 
      />
      
      <div className="video-container">
        <iframe 
          width="90%" 
          height="90%" 
          src={`https://www.youtube.com/embed/${apiData.key}?autoplay=1`} 
          title={apiData.name} 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
        ></iframe>
      </div>

      <div className="player-info">
        <div className="player-date">
          {apiData.published_at ? new Date(apiData.published_at).toLocaleDateString() : 'N/A'}
        </div>
        <h2 className="player-title">{apiData.name || 'Video'}</h2>
        <div className="player-type">{apiData.type || 'Trailer'}</div>
      </div>
    </div>
  );
};

export default Player;