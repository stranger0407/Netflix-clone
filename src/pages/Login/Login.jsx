import React, { useState, useEffect } from 'react';
import './Login.css';
import logo from '../../assets/logo.png';
import { login, signup } from '../../firebase';
import netflix_spinner from '../../assets/netflix_spinner.gif';
import { toast } from 'react-toastify';

const Login = () => {
  const [signState, setSignState] = useState("Sign In");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (signState === "Sign Up" && !formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      if (signState === "Sign In") {
        await login(formData.email, formData.password);
        toast.success("Successfully logged in!");
      } else {
        await signup(formData.name, formData.email, formData.password);
        toast.success("Account created successfully!");
      }
    } catch (error) {
      console.error("Authentication error:", error);
      toast.error(error.message || "Authentication failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const toggleSignState = () => {
    setSignState(prevState => prevState === "Sign In" ? "Sign Up" : "Sign In");
    // Clear errors when switching between sign in and sign up
    setErrors({});
  };

  if (loading) {
    return (
      <div className="loading">
        <img src={netflix_spinner} alt="Loading" />
      </div>
    );
  }

  return (
    <div className="login">
      <img src={logo} className="login-logo" alt="Netflix" />
      
      <div className="login-form">
        <h1>{signState}</h1>
        
        <form onSubmit={handleSubmit} noValidate>
          {signState === "Sign Up" && (
            <div className="form-group">
              <input 
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className={errors.name ? "error" : ""}
              />
              {errors.name && <p className="error-text">{errors.name}</p>}
            </div>
          )}
          
          <div className="form-group">
            <input 
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className={errors.email ? "error" : ""}
            />
            {errors.email && <p className="error-text">{errors.email}</p>}
          </div>
          
          <div className="form-group">
            <input 
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className={errors.password ? "error" : ""}
            />
            {errors.password && <p className="error-text">{errors.password}</p>}
          </div>
          
          <button type="submit" className="submit-btn">{signState}</button>
          
          <div className="form-help">
            <div className="remember">
              <input 
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)} 
              />
              <label htmlFor="remember">Remember Me</label>
            </div>
            <p className="help-link">Need Help?</p>
          </div>
        </form>
        
        <div className="form-switch">
          {signState === "Sign In" ? (
            <p>New to Netflix? <span onClick={toggleSignState}>Sign Up Now</span></p>
          ) : (
            <p>Already a member? <span onClick={toggleSignState}>Sign In Now</span></p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;