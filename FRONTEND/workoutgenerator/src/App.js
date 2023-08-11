import React, { useState, useCallback } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import Users from "./user/pages/Users";
import Auth from "./user/pages/Auth";
import Exercises from "./exercise/pages/Exercises";
import "./App.css";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import UserExercises from "./userExercises/pages/UserExercises";
import NewUserExercise from "./userExercises/pages/NewUserExercise";
import UpdateUserExercise from "./userExercises/pages/UpdateUserExercise";
import { AuthContext } from "./shared/context/authContext";
import HomePage from "./shared/pages/HomePage";
import { loggedIn, admin } from "./config/global";
const App = () => {

  //const loggedIn = window.localStorage.getItem("isLoggedIn");
  //const admin = window.localStorage.getItem("isAdmin");

  console.log('loggedin', loggedIn);
  console.log('admin-----', admin);

 const [isLoggedIn, setIsLoggedIn] = useState(false);
  
 const [isAdmin, setIsAdmin] = useState(false);

  const logIn = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logOut = useCallback(() => {
    setIsLoggedIn(false);
    window.localStorage.removeItem("isLoggedIn");
    window.localStorage.removeItem("isAdmin");
  }, []);

  const setAdminTrue = useCallback(() => {
    setIsAdmin(true);
  });

  const setAdminFalse = useCallback(() => {
    setIsAdmin(false);
  });

  let routes;



  if (loggedIn==="true") {
    if (admin==="true") {
    
      routes = (
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/users" exact>
            <Users />
          </Route>
          <Route path="/:userId/userExercises" exact>
            <UserExercises />
          </Route>
          <Route path="/userExercise/new" exact>
            <NewUserExercise />
          </Route>
          <Route path="/userExercise/:id" exact>
            <UpdateUserExercise />
          </Route>
          <Redirect to="/" />
        </Switch>
      );
    } else {
      routes = (
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/:userId/userExercises" exact>
            <UserExercises />
          </Route>
          <Route path="/userExercise/new" exact>
            <NewUserExercise />
          </Route>
          <Route path="/userExercise/:id" exact>
            <UpdateUserExercise />
          </Route>
          <Redirect to="/" />
        </Switch>
      );
    }
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/exercises" exact>
          <Exercises />
        </Route>
        <Route path="/auth" exact>
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }



 

  return (
   
    <AuthContext.Provider
    value={{
      isLoggedIn: isLoggedIn,
      isAdmin: isAdmin,
      setAdminTrue: setAdminTrue,
      setAdminFalse:setAdminFalse,
      login: logIn,
      logout: logOut,
    }}
  >
    <Router>
      <MainNavigation />
      <main>{routes}</main>
    </Router>
  </AuthContext.Provider> 
  
  );
};

export default App;
