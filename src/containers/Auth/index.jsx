import React from 'react';
import './style.css';
import { useLocation } from 'react-router-dom';

const Auth = ({ children }) => {
  const { pathname } = useLocation();

  return (
    <div className="auth_container">
      <img src="assets\auth_page.jpg" alt="auth-face" />
      <div className="form-container">
        <h1 className="form-header">hipstagram</h1>
        {pathname === '/login' ? <h2>Sign in</h2> : <h2>Sign Up</h2>}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Auth;
