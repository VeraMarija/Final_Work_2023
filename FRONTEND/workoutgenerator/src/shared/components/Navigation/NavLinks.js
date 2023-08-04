import React from "react";
import { NavLink } from 'react-router-dom';

import './NavLinks.css';

const NavLinks = props => {
    return <ul className="nav-links">
        <li>
        <NavLink to="/" exact >Users</NavLink>
        </li>  
        <li>
        <NavLink to="/exercises">Exercises</NavLink>
        </li>  
        <li>
        <NavLink to="/userExercise/new">New Exercise</NavLink>
        </li>    
        <li>
        <NavLink to="/u1/profile">Profile</NavLink>
        </li>   
        <li>
        <NavLink to="/workout/new">Generate New Workout</NavLink>
        </li>     
        <li>
        <NavLink to="/workouts/all">My Workouts</NavLink>
        </li>  
        <li>
        <NavLink to="/auth">AUTHENTICATE</NavLink>
        </li>  
    </ul>
};

export default NavLinks;