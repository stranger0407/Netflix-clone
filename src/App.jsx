import React, { useEffect, useState, lazy, Suspense } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ErrorBoundary from './pages/ErrorBoundary/ErrorBoundary';

// Use lazy loading for better performance
const Home = lazy(() => import('./pages/Home/Home'));
const Login = lazy(() => import('./pages/Login/Login'));
const Player = lazy(() => import('./pages/Player/Player'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));

// Loading spinner component
const LoadingSpinner = () => (
  <div className="global-loading">
    <div className="spinner"></div>
    <p>Loading...</p>
  </div>
);

// Protected route component
const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
    
    return () => unsubscribe();
  }, []);
  
  if (isAuthenticated === null) {
    return <LoadingSpinner />;
  }
  
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const App = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false);
      // Only force navigation during initial load
      if (window.location.pathname === '/') {
        if (!user) {
          navigate('/login');
        }
      }
    });
    
    return () => unsubscribe();
  }, [navigate]);
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  return (
    <div className="app">
      <ToastContainer 
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      
      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              } 
            />
            <Route path="/login" element={<Login />} />
            <Route 
              path="/player/:id" 
              element={
                <ProtectedRoute>
                  <Player />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default App;