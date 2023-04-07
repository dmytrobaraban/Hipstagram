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
            <NavLink to="/users">Users</NavLink>
            <NavLink to="/profile">
              <img src="assets/user_icon.png" alt="user_icon" />
            </NavLink>
          </ul>
        </>
      ) : (
        <>
          <HeaderTitle />
          <NavLink to="/">Feed</NavLink>
          <NavLink to="/users">Users</NavLink>
          <NavLink to="/profile">
            <img src="assets/user_icon.png" alt="user_icon" />
          </NavLink>
        </>
      )}
    </div>
  );
};

export default Header;
