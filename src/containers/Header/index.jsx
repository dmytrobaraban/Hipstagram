import React from 'react';
import { NavLink } from 'react-router-dom';
import './style.css';
import { useLocation } from 'react-router-dom';
import HeaderTitle from '../../components/HederTitle';

const imagePath = (name) => `assets/svg/${name}.svg`;

const Header = () => {
  const { pathname } = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
  };

  return (
    <div className="header">
      {pathname === '/' ? (
        <>
          <HeaderTitle />
          <NavLink to="/users">
            <img src={imagePath('users')} alt="users" />
          </NavLink>
          <NavLink to="/profile">
            <img src={imagePath('user')} alt="user" />
          </NavLink>
          <a href=" " onClick={handleLogout}>
            <img src={imagePath('logout')} alt="logout" />
          </a>
        </>
      ) : pathname === '/users' ? (
        <>
          <HeaderTitle />
          <NavLink to="/">
            <img src={imagePath('home')} alt="home" />
          </NavLink>
          <NavLink to="/profile">
            <img src={imagePath('user')} alt="user" />
          </NavLink>
          <a href=" " onClick={handleLogout}>
            <img src={imagePath('logout')} alt="logout" />
          </a>
        </>
      ) : pathname === '/profile' ? (
        <>
          <HeaderTitle />
          <NavLink to="/">
            <img src={imagePath('home')} alt="home" />
          </NavLink>
          <NavLink to="/users">
            <img src={imagePath('users')} alt="users" />
          </NavLink>
          <NavLink to="/profile">
            <img src={imagePath('user')} alt="user" />
          </NavLink>
          <a href=" " onClick={handleLogout}>
            <img src={imagePath('logout')} alt="logout" />
          </a>
        </>
      ) : (
        <>
          <HeaderTitle />
          <NavLink to="/">
            <img src={imagePath('home')} alt="home" />
          </NavLink>
          <NavLink to="/users">
            <img src={imagePath('users')} alt="users" />
          </NavLink>
          <NavLink to="/profile">
            <img src={imagePath('user')} alt="user" />
          </NavLink>
          <a href=" " onClick={handleLogout}>
            <img src={imagePath('logout')} alt="logout" />
          </a>
        </>
      )}
    </div>
  );
};

export default Header;
