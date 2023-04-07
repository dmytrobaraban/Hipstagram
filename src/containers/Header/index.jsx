import React from "react";
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <ul>
            <li>
                <NavLink to="/">Feed</NavLink>
                <NavLink to="/users">Users</NavLink>
                <NavLink to="/profile">Profile</NavLink>
            </li>
        </ul>
    )
}

export default Header;