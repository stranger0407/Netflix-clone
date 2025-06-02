import React, { Component } from 'react';
import './ErrorBoundary.css';
import { Link } from 'react-router-dom';
import netflix_logo from '../../assets/logo.png';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <img src={netflix_logo} alt="Netflix" className="error-logo" />
          <h1>Something went wrong</h1>
          <p>We're sorry, but there was an error while loading this page.</p>
          <div className="error-actions">
            <button onClick={() => window.location.reload()}>
              Refresh Page
            </button>
            <Link to="/" className="home-link">
              Return to Home
            </Link>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;