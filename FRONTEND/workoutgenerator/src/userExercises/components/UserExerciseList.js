import React from "react";

import "./UserExerciseList.css";
import Card from "../../shared/components/UIElements/Card";
import UserExerciseItem from "./UserExerciseItem";
import Button from "../../shared/components/FormElements/Button";

const UserExerciseList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="user-exercise-list center">
        <Card>
          <h2>No user exercises found. Do you want to create one?</h2>
          <Button  to={`/userExercise/new`}>Create your exercise</Button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="user-exercise-list">
      {props.items.map((userExercise) => (
        <UserExerciseItem
          key={userExercise.id}
          id={userExercise.id}
          user={userExercise.user}
          name={userExercise.name}
          liftWeight={userExercise.liftWeight}
          repetition={userExercise.repetition}
        />
      ))}
    </ul>
  );
};

export default UserExerciseList;
