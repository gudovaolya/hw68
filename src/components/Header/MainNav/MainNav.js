import React from 'react';
import './MainNav.css';
import MainNavItem from "./MainNavItem/MainNavItem";

const MainNav = (props) => (
    <nav className="main-nav">
        <ul>
            <MainNavItem to="/" exact>Counter</MainNavItem>
            <MainNavItem to="/todolist" exact>My Tasks</MainNavItem>
        </ul>
    </nav>
);

export default MainNav;