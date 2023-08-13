import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import "./NavLinks.css";
import { AuthContext } from "../../context/authContext";


const NavLinks = (props) => {
  const auth = useContext(AuthContext);
  const userId = auth.userId;

  const loggedState = auth.isLoggedIn;

  return (
    <ul className="nav-links">
      
      {loggedState && auth.role && (
        <li>
          <NavLink to="/users" exact>
            Users
          </NavLink>
        </li>
      )}
      { (
        <li>
          <NavLink to="/exercises">Exercises</NavLink>
        </li>
      )}
      {loggedState && (
        <li>
          <NavLink to="/userExercise/new">New Exercise</NavLink>
        </li>
      )}
      {loggedState && (
        <li>
          <NavLink to={`/profile/${userId}`}>Profile</NavLink>
        </li>
      )}
      {loggedState && (
        <li>
          <NavLink to="/workout/new">Generate New Workout</NavLink>
        </li>
      )}
      {loggedState && (
        <li>
          <NavLink to="/workouts/all">My Workouts</NavLink>
        </li>
      )}
      {!loggedState && (
        <li>
          <NavLink to="/auth">Sign In</NavLink>
        </li>
      )}
      {loggedState && (
        <li>
          <button onClick={auth.logout}>LOGOUT</button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
