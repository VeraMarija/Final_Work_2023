import React from "react";
import { useParams } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { VALIDATOR_MIN } from "../../shared/util/validators";
import "./UserExerciseForm.css";

const DUMMY_USER_EXERCISES = [
  {
    id: "ue1",
    user: "u1",
    name: "Bench Press",
    liftWeight: 100,
    repetition: 5,
  },
  {
    id: "ue2",
    user: "u1",
    name: "Deadlift",
    liftWeight: 150,
    repetition: 4,
  },
  {
    id: "ue2",
    user: "u3",
    name: "Deadlift",
    liftWeight: 150,
    repetition: 4,
  },
];

const UpdateUserExercise = () => {
  const id = useParams().id;

  const userExercise = DUMMY_USER_EXERCISES.find(
    (userExercise) => userExercise.id === id
  );

  if (!userExercise) {
    return (
      <div className="center">
        <h2>Could not find user exercise</h2>
      </div>
    );
  }
  return (
    <form className="user-exercise-form">
      <Input
        id="lift_weight"
        element="input"
        type="number"
        label="Lift weight"
        min="1"
        validators={[VALIDATOR_MIN(1)]}
        errorText="Min value must be 1"
        onInput={() => {}}
        value={userExercise.liftWeight}
        valid={true}
      />
      <Input
        id="repetition"
        element="input"
        type="number"
        label="Repetition"
        min="1"
        validators={[VALIDATOR_MIN(1)]}
        errorText="Min value must be 1"
        onInput={() => {}}
        value={userExercise.repetition}
        valid={true}
      />
      <Button type="submit" disabled={true}>UPDATE EXERCISE</Button>
    </form>
  );
};

export default UpdateUserExercise;
