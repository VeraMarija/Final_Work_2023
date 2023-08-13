import React, { useState, useCallback, useEffect } from "react";
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
import NewUser from "./user/pages/NewUser";
import Userprofile from "./user/pages/UserProfile";
import UpdateUser from "./user/pages/UpdateUser";

/*<Route path="/editUser/:userId" exact>
            <UpdateUser />
          </Route>
          <Route path="/deleteUSer/:userId" exact>
            <DeleteUser />
          </Route>*/

let logoutTimer;

const App = () => {
  const [userId, setUserId] = useState(false);
  const [token, setToken] = useState(false);
  const [role, setRole] = useState(false);
  const [tokenExpiration, setTokenExpiration] = useState(false);

  const logIn = useCallback((userId, token, role, tokenExpiration) => {
    setToken(token);
    setUserId(userId);
    setRole(role);
    setTokenExpiration(tokenExpiration);
    localStorage.setItem(
      "loginData",
      JSON.stringify({
        userId: userId,
        token: token,
        role: role,
        tokenExpiration: tokenExpiration,
      })
    );
  }, []);

  const logOut = useCallback(() => {
    setToken(null);
    setUserId(null);
    setRole(null);
    setTokenExpiration(null);
    localStorage.removeItem("loginData");
  }, []);

  useEffect(() => {
    if (token && tokenExpiration) {
      const remainingTime =
        new Date(tokenExpiration).getTime() - new Date().getTime();
      const logoutTimer = setTimeout(logOut, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logOut, tokenExpiration]); //ako npr.kliknemo logout nemamo više token mora se trigerat
  //cleartimeout da ne odbrojava više

  useEffect(() => {
    const loginData = JSON.parse(localStorage.getItem("loginData"));
    if (
      loginData &&
      loginData.token &&
      new Date(loginData.tokenExpiration) > new Date()
    ) {
      logIn(
        loginData.userId,
        loginData.token,
        loginData.role,
        loginData.tokenExpiration
      );
    }
  }, [logIn]);

  let routes;

  if (token) {
    //korisnik je autenticiran s tokenom(logiran)
    if (role === "admin") {
      console.log("ruta je admin");
      routes = (
        <Switch>
          <Route path="/users" exact>
            <Users />
          </Route>
          <Route path="/user/new" exact>
            <NewUser />
          </Route>
          <Route path="/profile/:userId" exact>
            <Userprofile />
          </Route>
          <Route path="/editUser/:userId" exact>
            <UpdateUser />
          </Route>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/exercises" exact>
            <Exercises />
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
          <Route path="/profile/:userId" exact>
            <Userprofile />
          </Route>
          <Route path="/exercises" exact>
            <Exercises />
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
        isLoggedIn: !!token,
        userId: userId,
        token: token,
        role: role,
        tokenExpiration: tokenExpiration,
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
