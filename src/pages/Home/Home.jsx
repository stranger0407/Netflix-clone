import React, { useState, useEffect } from 'react'
import './Home.css'
import Navbar from '../../components/Navbar/Navbar'
import hero_banner from '../../assets/hero_banner.jpg'
import hero_title from '../../assets/hero_title.png'
import play_icon from '../../assets/play_icon.png'
import info_icon from '../../assets/info_icon.png'
import TitleCards from '../../components/TitleCards/TitleCards'
import Footer from '../../components/Footer/Footer'

const Home = () => {
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Control animation timing for staggered entry
  useEffect(() => {
    document.body.classList.add('dark-mode');
    const timer = setTimeout(() => setIsLoading(false), 1500);
    
    return () => {
      document.body.classList.remove('dark-mode');
      clearTimeout(timer);
    }
  }, []);

  return (
    <div className='home'>
      <Navbar />
      <div className="hero">
        {isLoading ? (
          <div className="hero-loading"></div>
        ) : (
          <>
            <img 
              src={hero_banner} 
              alt="Movie banner" 
              className={`banner-image ${heroLoaded ? 'loaded' : ''}`}
              onLoad={() => setHeroLoaded(true)}
            />
            <div className={`hero-overlay ${heroLoaded ? 'active' : ''}`}></div>
            <div className={`hero-caption ${heroLoaded ? 'visible' : ''}`}>
              <img src={hero_title} alt="Movie title" className='caption-img'/>
              <p className="hero-description">
                Discovering his ties to a secret ancient order, a young man living in modern Istanbul 
                embarks on a quest to save the city from an immortal enemy.
              </p>
              <div className="hero-btns">
                <button className='btn primary-btn' aria-label="Play movie">
                  <img src={play_icon} alt="" /> Play
                </button>
                <button className='btn secondary-btn' aria-label="More information">
                  <img src={info_icon} alt="" /> More Info
                </button>
              </div>
              
              {/* Featured preview cards in hero section with heading */}
              <div className="hero-cards-preview">
                <h3 className="preview-heading">Popular Now</h3>
                <TitleCards customClass="preview-cards" limit={10} />
              </div>
            </div>
          </>
        )}
      </div>
      
      <div className="content-container">
        <div className="section-divider"></div>
        <div className="more-cards">
          <TitleCards title="Blockbuster Movies" category="top_rated"/>
          <TitleCards title="Only on Netflix" category="popular"/>
          <TitleCards title="Upcoming Releases" category="upcoming"/>
          <TitleCards title="Top Picks for You" category="now_playing"/>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}

export default Home