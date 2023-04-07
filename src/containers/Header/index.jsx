import React from 'react';
import { NavLink } from 'react-router-dom';
import './style.css';
import { useLocation } from 'react-router-dom';
import HeaderTitle from '../../components/HederTitle';

const Header = () => {
  const { pathname } = useLocation();

  return (
    <div className="header">
      {pathname === '/' ? (
        <>
          <HeaderTitle />
          <ul className="list-links">
            <NavLink to="/users">
              <img src="assets/users.svg" alt="users_icon" />
            </NavLink>
            <NavLink to="/profile">
              <img src="assets/user_icon.png" alt="user_icon" />
            </NavLink>
          </ul>
        </>
      ) : pathname === '/users' ? (
        <>
          <HeaderTitle />
          <NavLink to="/">
            <img src="assets/home-icon.svg" alt="home_icon" />
          </NavLink>
          <NavLink to="/profile">
            <img src="assets/user_icon.png" alt="user_icon" />
          </NavLink>
        </>
      ) : (
        <>
          <HeaderTitle />
          <NavLink to="/">
            <img src="assets/home-icon.svg" alt="home_icon" />
          </NavLink>
          <NavLink to="/users">
            <img src="assets/users.svg" alt="users_icon" />
          </NavLink>
          <NavLink to="/profile">
            <img src="assets/user_icon.png" alt="user_icon" />
          </NavLink>
        </>
      )}
    </div>
  );
};

export default Header;
