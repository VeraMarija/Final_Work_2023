import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import Users from "./user/pages/Users";
import Exercises from "./exercise/pages/Exercises";
import "./App.css";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import UserExercises from "./userExercises/pages/UserExercises";
import NewUserExercise from "./userExercises/pages/NewUserExercise";
import UpdateUserExercise from "./userExercises/pages/UpdateUserExercise";

const App = () => {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Switch>
          <Route path="/" exact>
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
          <Route path="/exercises" exact>
            <Exercises />
          </Route>
          <Redirect to="/" />
        </Switch>
      </main>
    </Router>
  );
};

export default App;
