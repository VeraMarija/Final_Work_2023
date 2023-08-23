import React from "react";
import { Link, useNavigate } from "react-router-dom";

import "./WorkoutList.css";
import WorkoutItem from "./WorkoutItem";
import Card from "../../shared/components/UIElements/Card";
import { BsPersonFillAdd } from "react-icons/bs";

const WorkoutList = (props) => {
  //s backenda dobijem sve treninge od određenog korisnika tj.autenticiranog (auth.userId)
  // u tim treninzima je id od korisnika i lista id-eva od vjezbi koje je korsnik kreira za taj trening
  //treba bit populate nad userExercises
  const navigate = useNavigate();
  const navigateToCreateWorkout = () => {
    navigate("/workout/new");
  };

  if (props.items.length === 0) {
    return (
      <React.Fragment>
        <a>Add new workout</a>&nbsp;&nbsp;
        <button onClick={navigateToCreateWorkout}>
          <BsPersonFillAdd className="icon" />
        </button>
        <div className="center">
          <Card>
            <h2>No workouts found.</h2>
          </Card>
        </div>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <div className="workout-list-main">
      <div>
        <a className="p-add-workout">Add new workout</a>
        <button onClick={navigateToCreateWorkout}>
          <BsPersonFillAdd className="add-icon" />
        </button>
        </div>
        <ul className="workout-list">
          {props.items.map((workout) => (
            <WorkoutItem
              key={workout._id}
              id={workout._id}
              name={workout.name}
              user={workout.user}
              userExercises={workout.userExercises}
              workoutCreated={workout.createdAt}
              workoutUpdated={workout.updatedAt}
            />
          ))}
        </ul>
      </div>
    </React.Fragment>
  );
};

export default WorkoutList;
