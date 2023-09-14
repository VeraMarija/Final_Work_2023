import React from "react";
import { Link, useNavigate } from "react-router-dom";

import "./WorkoutList.css";
import WorkoutItem from "./WorkoutItem";
import Card from "../../shared/components/UIElements/Card";
import { BsPersonFillAdd } from "react-icons/bs";

const WorkoutList = (props) => {
  const navigate = useNavigate();
  const navigateToCreateWorkout = () => {
    navigate("/workout/new");
  };

  if (props.items.length === 0) {
    return (
      <React.Fragment>
        <Card className="adding-workout">
        <span>Add new workout</span>&nbsp;&nbsp;
        <button onClick={navigateToCreateWorkout}>
          <BsPersonFillAdd className="icon" />
        </button>
        </Card>
        <div className="center">
          <Card className="no-workouts">
            <h2>No workouts found.</h2>
          </Card>
        </div>
      </React.Fragment>
    );
  }
  console.log(props);
  return (
    <React.Fragment>
      <div className="workout-list-main">
      <Card className="adding-workout">
        <span>Add new workout</span>&nbsp;&nbsp;
        <button onClick={navigateToCreateWorkout}>
          <BsPersonFillAdd className="icon" />
        </button>
        </Card>
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
