import React, { useReducer, useEffect } from "react";


import "./Input.css";
import { validate } from "../../util/validators";

/**
 * outside of component it doesnt depend on any component
 * always returns a state , depends on action whe make
 **/
const inputReducer = (state, action) => {
  switch (action.type) {
    case "change_action":
      return {
        ...state, //spread-operator
        value: action.value,
        isValid: validate(action.value, action.validators),
      };
    case "touch_action": {
      return {
        ...state,
        isTouched: true,
      };
    }
    default:
      return state;
  }
};

const Input = (props) => {
  /**
   * second argument is initial state
   * returns two elements -> current state and dispatch function
   * dispatch function -> a way to set state (to dispatch user action to the reducer)
   **/
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || "",
    isTouched: false,
    isValid: props.initialValid || false,
  });


  // extracting to easy using
  const { id, onInput } = props;
  const { value, isValid } = inputState;

  //whenever some dependencies change (input value, validity) it triggers
  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  /*
  function that triggers when user enter smth*/
  const ChangeHandler = (event) => {
    dispatch({
      type: "change_action",
      value: event.target.value, //event.target the element on which event happens
      validators: props.validators,
    });
    console.log('--', inputState)
  };

  const TouchHandler = () => {
    dispatch({
      type: "touch_action",
    });
  };

  const element =
    props.element === "input" ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={ChangeHandler} // function that triggers
        onBlur={TouchHandler}
        value={inputState.value} //two way binding
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={ChangeHandler}
        onBlur={TouchHandler}
        value={inputState.value}
      />
    );

  return (
    <div
      className={`form-control ${
        !inputState.isValid && inputState.isTouched && "form-control--invalid"
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid  && inputState.isTouched  && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;
