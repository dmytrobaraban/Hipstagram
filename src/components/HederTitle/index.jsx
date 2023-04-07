import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './style.css';

const HeaderTitle = () => {
  const { pathname } = useLocation();
  const [title, setTitle] = useState('');

  useEffect(() => {
    switch (pathname) {
      case '/':
        setTitle('Feed');
        break;
      case '/users':
        setTitle('Users');
        break;
      case '/profile':
        setTitle('Profile');
        break;
      default:
        setTitle('');
        break;
    }
  }, [pathname]);

  const titleStyle = {
    fontWeight: '700',
    fontSize: '24px',
    lineHeight: '28px',
    color: '#FFFFFF',
  };

  return (
    <div className="header-title-container">
      <h2 style={titleStyle}>{title}</h2>
    </div>
  );
};

export default HeaderTitle;
