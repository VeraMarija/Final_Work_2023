import React, { useState, useCallback, useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
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
import UserProfile from "./user/pages/UserProfile";
import UpdateUser from "./user/pages/UpdateUser";

/*<Route path="/editUser/:userId" exact>
            <UpdateUser />
          </Route>
          <Route path="/deleteUSer/:userId" exact>
            <DeleteUser />
          </Route>*/

let logoutTimer;

const App = () => {
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [tokenExpiration, setTokenExpiration] = useState(
    localStorage.getItem("tokenExpiration")
  );

  console.log("token", token);
  console.log("userid", userId);
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
    console.log("usli");
    if (role === "admin") {
      console.log("u adminu");
      routes = (
        <Routes>
          <Route path="/users" element={<Users />} />
          <Route path="/user/new" element={<NewUser />} />
          <Route path="/profile/:userId" element={<UserProfile />} />
          <Route path="/editUser/:userId" element={<UpdateUser />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/exercises" element={<Exercises />} />
          <Route path="/:userId/userExercises" element={<UserExercises />} />
          <Route path="/userExercise/new" element={<NewUserExercise />} />
          <Route path="/userExercise/:id" element={<UpdateUserExercise />} />
        </Routes>
      );
    } else {
      routes = (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile/:userId" element={<UserProfile />} />
          <Route path="/exercises" element={<Exercises />} />
          <Route path="/:userId/userExercises" element={<UserExercises />} />
          <Route path="/userExercise/new" element={<NewUserExercise />} />
          <Route path="/userExercise/:id" element={<UpdateUserExercise />} />
        </Routes>
      );
    }
  } else {
    routes = (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/auth" element={<Navigate to="/" />} />
      </Routes>
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
        <main>{routes}</main>
        <MainNavigation />
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
