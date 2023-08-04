import React, { useCallback, useReducer } from "react";

import "./UserExerciseForm.css";
import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_MIN,
} from "../../shared/util/validators";
import Button from "../../shared/components/FormElements/Button";

//using for form entire
const formReducer = (state, action) => {
  switch (action.type) {
    case "change_input":
      let formIsValid = true;
      for (const input in state.inputs) {
        if (input === action.inputId) {
          //currently updated froma action
          formIsValid = formIsValid && action.isValid;
        } else {
          //if input is not currently getting updated
          formIsValid = formIsValid && state.inputs[input].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          //dynamically updating one of the fields in inputs object
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };
    default:
      return state;
  }
};

const NewUserExercise = () => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
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
    isValid: false,
  });
  //this function is reused with usecallback hook (not creating new function
  // every time component function rerenders)
  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: "change_input",
      value: value,
      isValid: isValid,
      inputId: id,
    });
  }, []);

  //logic for sending to server(to backend part)
  const submitHandler = event => {
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
