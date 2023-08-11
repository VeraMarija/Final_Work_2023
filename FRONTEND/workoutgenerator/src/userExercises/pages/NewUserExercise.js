import React from "react";

import "./UserExerciseForm.css";
import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MIN,
} from "../../shared/util/validators";
import Button from "../../shared/components/FormElements/Button";
import { useForm } from "../../shared/hooks/formHook";

const NewUserExercise = () => {
  const [formState, inputHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      repetition: {
        value: "",
        isValid: false,
      },
      lift_weight: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  //logic for sending to server(to backend part)
  const submitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  return (
    <form className="user-exercise-form" onSubmit={submitHandler}>
      <Input
        id="name"
        element="input"
        type="text"
        label="Name"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid text"
        onInput={inputHandler}
      />
      <Input
        id="lift_weight"
        element="input"
        type="number"
        label="Lift weight"
        min="1"
        validators={[VALIDATOR_MIN(1)]}
        errorText="Min value must be 1"
        onInput={inputHandler}
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
      />
      <Button type="subit" disabled={!formState.isValid}>
        ADD EXERCISE
      </Button>
    </form>
  );
};

export default NewUserExercise;
