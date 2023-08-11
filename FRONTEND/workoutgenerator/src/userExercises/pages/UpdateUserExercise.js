import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { VALIDATOR_MIN } from "../../shared/util/validators";
import "./UserExerciseForm.css";
import { useForm } from "../../shared/hooks/formHook";
import Card from "../../shared/components/UIElements/Card";

const DUMMY_USER_EXERCISES = [
  {
    id: "ue1",
    user: "u1",
    name: "Bench Press",
    lift_weight: 100,
    repetition: 5,
  },
  {
    id: "ue2",
    user: "u1",
    name: "Deadlift",
    lift_weight: 150,
    repetition: 4,
  },
  {
    id: "ue2",
    user: "u3",
    name: "Deadlift",
    lift_weight: 150,
    repetition: 4,
  },
];

const UpdateUserExercise = () => {
  const id = useParams().id;

  const [isLoading, setIsLoading] = useState(true);

  const [formState, inputHandler, setFormData] = useForm(
    {
      lift_weight: {
        value: "",
        isValid: false,
      },
      repetition: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const userExercise = DUMMY_USER_EXERCISES.find(
    (userExercise) => userExercise.id === id
  );

  useEffect(() => {
    if (userExercise) {
      setFormData(
        {
          lift_weight: {
            value: userExercise.lift_weight,
            isValid: true,
          },
          repetition: {
            value: userExercise.repetition,
            isValid: true,
          },
        },
        true
      );
    }
    setIsLoading(false);
  }, [setFormData, userExercise]);

  const updateSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  if (!userExercise) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find user exercise</h2>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="center">
        <h2>Loading....</h2>
      </div>
    );
  }

  return (
    <form className="user-exercise-form" onSubmit={updateSubmitHandler}>
      <Input
        id="lift_weight"
        element="input"
        type="number"
        label="Lift weight"
        min="1"
        validators={[VALIDATOR_MIN(1)]}
        errorText="Min value must be 1"
        onInput={inputHandler}
        initialValue={formState.inputs.lift_weight.value}
        initialValid={formState.inputs.lift_weight.isValid}
      />
      <Input
        id="repetition"
        element="input"
        type="number"
        label="Repetition"
        min="1"
        validators={[VALIDATOR_MIN(1)]}
        errorText="Min value must be 1"
        onInput={inputHandler}
        initialValue={formState.inputs.repetition.value}
        initialValid={formState.inputs.repetition.isValid}
      />
      <Button type="submit" disabled={!formState.isValid}>
        UPDATE EXERCISE
      </Button>
    </form>
  );
};

export default UpdateUserExercise;
