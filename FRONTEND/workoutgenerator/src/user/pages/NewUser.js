import React, { useContext } from "react";

import "./UserForm.css";
import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import Button from "../../shared/components/FormElements/Button";
import { useForm } from "../../shared/hooks/formHook";
import { AuthContext } from "../../shared/context/authContext";
import { port_string } from "../../config/global";
import { useHttpHook } from "../../shared/hooks/httpHook";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

const NewUser = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, removeError } = useHttpHook();

  const [formState, inputHandler] = useForm(
    {
      firstName: {
        value: "",
        isValid: false,
      },
      lastName: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  //logic for sending to server(to backend part)
  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      const responseData = await sendRequest(
        port_string + "users/",
        "POST",
        JSON.stringify({
          firstName: formState.inputs.firstName.value,
          lastName: formState.inputs.lastName.value,
          email: formState.inputs.email.value,
          password: formState.inputs.password.value,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token.token,
        }
      );

      console.log("responseData", responseData);
    } catch (err) {}
  };

  return (
    <div className="user-form-main">
      <ErrorModal error={error} onClear={removeError} />
      {isLoading && <LoadingSpinner asOverlay />}

      <form className="user-form" onSubmit={submitHandler}>
        <h3>Enter data for creating user:</h3>
        <Input
          id="firstName"
          element="input"
          type="text"
          label="First Name"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid text"
          onInput={inputHandler}
        />
        <Input
          id="lastName"
          element="input"
          type="text"
          label="Last Name"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid text"
          onInput={inputHandler}
        />
        <Input
          id="email"
          element="input"
          type="text"
          label="E-mail"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid text"
          onInput={inputHandler}
        />
        <Input
          id="password"
          element="input"
          type="password"
          label="Password"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="You need to enter a min of 5 characters"
          onInput={inputHandler}
        />
        <Button type="subit" disabled={!formState.isValid}>
          ADD USER
        </Button>
      </form>
    </div>
  );
};

export default NewUser;
