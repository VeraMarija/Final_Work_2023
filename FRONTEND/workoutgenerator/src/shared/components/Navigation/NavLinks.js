import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import "./NavLinks.css";
import { AuthContext } from "../../context/authContext";
import { loggedIn, admin } from "../../../config/global";

const NavLinks = (props) => {
  const auth = useContext(AuthContext);

  const logoutHandler = () => {
    window.localStorage.removeItem("isLoggedIn");
    window.localStorage.removeItem("isAdmin");
    window.location.replace('/auth');
  }
  const loggedState = loggedIn==="true" ? true : false;
  const adminState = admin==="true" ? true : false;

  return (
    <ul className="nav-links">
      {loggedState && adminState && (
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
          <NavLink to="/u1/profile">Profile</NavLink>
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
          <button onClick={logoutHandler}>LOGOUT</button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
