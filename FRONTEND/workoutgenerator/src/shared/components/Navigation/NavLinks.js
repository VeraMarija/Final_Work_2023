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
      
      {loggedState && auth.role==="admin" && (
        <li>
          <NavLink to="/users" exact>
            Users
          </NavLink>
        </li>
      )}
      { loggedState && auth.role==="admin" &&(
        <li>
          <NavLink to="/exercises">Exercises</NavLink>
        </li>
      )}
     
      {loggedState && (
        <li>
          <NavLink to={`/profile/${userId}`}>Profile</NavLink>
        </li>
      )}
      {loggedState && (
        <li>
          <NavLink to="/workout/new">Create Workout</NavLink>
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
