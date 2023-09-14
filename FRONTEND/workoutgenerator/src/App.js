import React, { useState, useCallback, useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";

import Auth from "./user/pages/Auth";
import Exercises from "./exercise/pages/Exercises";
import "./App.css";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import { AuthContext } from "./shared/context/authContext";
import HomePage from "./shared/pages/HomePage";
import NewUser from "./user/pages/NewUser";
import UserProfile from "./user/pages/UserProfile";
import UpdateUser from "./user/pages/UpdateUser";
import NewExercise from "./exercise/pages/NewExercise";
import UpdateExercise from "./exercise/pages/UpdateExercise";
import ExerciseProfile from "./exercise/pages/ExerciseProfile";
import UserTable from "./user/components/UserTable";
import Workouts from "./workout/pages/Workouts";
import WorkoutProfile from "./workout/pages/WorkoutProfile";
import NewWorkout from "./workout/pages/NewWorkout";
import Upgrade1RM from "./workout/components/Upgrade1RM";
import AddExerciseOnWorkout from "./workout/pages/AddExerciseOnWorkout";
import WorkoutChart from "./workout/pages/WorkoutChart";
import ForgotPassword from "./user/pages/ForgotPassword";
import ResetPassword from "./user/pages/ResetPassword";
import ChartExercise from "./workout/pages/ChartExercise";
import Calories from "./user/pages/Calories";
import NewCalories from "./user/pages/NewCalories";
import UpdateCalories from "./user/pages/UpdateCalories";
import ChartExercise2 from "./workout/pages/ChartExercise2";
import Reduce1RM from "./workout/components/Reduce1RM";
import DeleteUserExercise from "./workout/pages/DeleteUserExercise";

let logoutTimer;

const App = () => {

  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [tokenExpiration, setTokenExpiration] = useState(
    localStorage.getItem("tokenExpiration")
  );

  const [otp, setOTP] = useState(localStorage.getItem("otp"));

  const forgotPasswordOTP = useCallback((randomNumber) => {
    setOTP(randomNumber);
    localStorage.setItem("otp", randomNumber);
  }, []);

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
    if (role === "admin") {
      routes = (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/users" element={<UserTable />} />
          <Route path="/user/new" element={<NewUser />} />
          <Route path="/profile/:userId" element={<UserProfile />} />
          <Route path="/editUser/:userId" element={<UpdateUser />} />
          <Route path="/exercises" element={<Exercises />} />
          <Route path="/exercise/new" element={<NewExercise />} />
          <Route path="/exerciseProfile/:exerciseId" element={<ExerciseProfile />}/>
          <Route path="/editExercise/:exerciseId" element={<UpdateExercise />}/>
          <Route path="/workoutChart" element={<WorkoutChart />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="/chart/:exerciseId" element={<ChartExercise />} />
          <Route path="/calories/:userId" element={<Calories />} />
          <Route path="/calories/new" element={<NewCalories />} />
        </Routes>
      );
    } else {
      routes = (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile/:userId" element={<UserProfile />} />
          <Route path="/editUser/:userId" element={<UpdateUser />} />
          <Route path="/workouts/all" element={<Workouts />} />
          <Route  path="/workoutProfile/:workoutId" element={<WorkoutProfile />}/>
          <Route path="/workout/new" element={<NewWorkout />} />
          <Route path="/upgrade1RM/:exerciseId" element={<Upgrade1RM />} />
          <Route path="/reduce1RM/:exerciseId" element={<Reduce1RM />} />
          <Route  path="/addExercise/:workoutId" element={<AddExerciseOnWorkout />} />
          <Route path="/chart/:exerciseId" element={<ChartExercise2 />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="/calories/:userId" element={<Calories />} />
          <Route path="/calories/new" element={<NewCalories />} />
          <Route  path="/exerciseProfile/:exerciseId" element={<ExerciseProfile />}/>
          <Route path="/editCalories/:caloriesId" element={<UpdateCalories/>}/>
          <Route path="/removeExercise/:exerciseId" element={<DeleteUserExercise/>}/>
        </Routes>
      );
    }
  } else {
    routes = (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/auth" element={<Navigate to="/" />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
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
        otp: otp,
        forgotPasswordOTP: forgotPasswordOTP,
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
