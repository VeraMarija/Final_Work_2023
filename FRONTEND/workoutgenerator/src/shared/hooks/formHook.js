import { useCallback, useReducer } from "react";

//using for form entire
const formReducer = (state, action) => {
  switch (action.type) {
    case "change_input":
      let formIsValid = true;
      for (const input in state.inputs) {
        if (!state.inputs[input]) {
          continue;
        }
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
    case "set_data":
      return {
        inputs: action.inputs,
        isValid: action.formIsValid,
      };
    default:
      return state;
  }
};

//custom hook always start with "use"
export const useForm = (initialInputs, initialFormValidity) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialFormValidity,
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

  const setFormData = useCallback((inputData, formValidity) => {
    dispatch({
      type: "set_data",
      inputs: inputData,
      formIsValid: formValidity,
    });
  }, []);

  return [formState, inputHandler, setFormData];
};
