import React, { useEffect, useRef, useState } from 'react';
import './Navbar.css';
import logo from '../../assets/logo.png';
import logo1 from '../../assets/logo1.png';
import search_icon from '../../assets/search_icon.svg';
import bell_icon from '../../assets/bell_icon.svg';
import profile_img from '../../assets/profile_img.png';
import caret_icon from '../../assets/caret_icon.svg';
import { logout } from '../../firebase';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const navRef = useRef();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  // Links for navigation items with actual paths
  const navLinks = [
    { title: 'Home', url: '/' },
    { title: 'Movies', url: '/movies' },
    { title: 'TV Shows', url: '/tvshows' },
    { title: 'News & Popular', url: '/news' },
    { title: 'My List', url: '/mylist' },
    { title: 'Browse by Language', url: '/browse' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        navRef.current?.classList.add('nav-dark');
      } else {
        navRef.current?.classList.remove('nav-dark');
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Close mobile menu when clicking outside
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('.navbar-left')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setSearchActive(!searchActive);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
  };

  const handleClickOption = (action) => {
    if (action === 'logout') {
      handleLogout();
    }
    // Add other actions as needed
    setDropdownOpen(false);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div ref={navRef} className="navbar">
      <div className="navbar-left">
        <Link to="/">
          <img src={logo1} alt="Netflix" />
        </Link>
        
        {/* Hamburger menu for mobile */}
        <div className={`mobile-menu-btn ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        
        <ul className={isMenuOpen ? 'mobile-active' : ''}>
          {navLinks.map((link, index) => (
            <li key={index}>
              <Link to={link.url} onClick={closeMenu}>{link.title}</Link>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="navbar-right">
        <div className={`search-container ${searchActive ? 'active' : ''}`}>
          <img 
            src={search_icon} 
            alt="Search" 
            className="icons" 
            onClick={toggleSearch} 
          />
          <input 
            type="text" 
            placeholder="Titles, people, genres" 
            className={`search-input ${searchActive ? 'active' : ''}`}
          />
        </div>
        
        <Link to="/kids" className="children-link">Children</Link>
        
        <div className="notification-icon">
          <img src={bell_icon} alt="Notifications" className="icons" />
          <span className="notification-badge">2</span>
        </div>
        
        <div className="navbar-profile" onClick={toggleDropdown}>
          <img src={profile_img} alt="Profile" className="profile" />
          <img src={caret_icon} alt="Dropdown" className="caret-icon" />
          
          {dropdownOpen && (
            <div className="dropdown">
              <div className="dropdown-item">
                <p onClick={() => handleClickOption('logout')}>Sign Out Of Netflix</p>
              </div>
              <div className="dropdown-item">
                <p onClick={() => handleClickOption('account')}>Account</p>
              </div>
              <div className="dropdown-item">
                <p onClick={() => handleClickOption('help')}>Help Center</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;