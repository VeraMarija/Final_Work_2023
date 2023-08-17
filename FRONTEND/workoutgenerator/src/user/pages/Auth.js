import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import "./Auth.css";
import Card from "../../shared/components/UIElements/Card";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { useForm } from "../../shared/hooks/formHook";
import { AuthContext } from "../../shared/context/authContext";
import { port_string } from "../../config/global";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpHook } from "../../shared/hooks/httpHook";

const Auth = () => {
  const navigate = useNavigate();

  const { isLoading, error, sendRequest, removeError } = useHttpHook();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const auth = useContext(AuthContext);

  const [formState, inputHandler, setFormData] = useForm(
    {
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

  const changeModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          firstName: undefined,
          lastName: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          firstName: {
            value: "",
            isValid: false,
          },
          lastName: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((previousMode) => !previousMode);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          port_string + "auth/login",
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );

        console.log("responseData", responseData);
        auth.login(
          responseData.userId,
          responseData.token,
          responseData.role,
          responseData.tokenExpiration
        );
        navigate("/");
      } catch (err) {}
    } else {
      try {
        const responseData = await sendRequest(
          port_string + "auth/register",
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
            firstName: formState.inputs.firstName.value,
            lastName: formState.inputs.lastName.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        auth.login(
          responseData.userId,
          responseData.token,
          responseData.role,
          responseData.tokenExpiration
        );
        navigate("/");
      } catch (err) {}
    }
  };

  return (
    <React.Fragment>
      <div className="main">
        <ErrorModal error={error} onClear={removeError} />
        <Card className="authentication">
          {isLoading && <LoadingSpinner asOverlay />}
          <h2>Enjoy in your personal workout </h2>
          <form onSubmit={submitHandler}>
            {!isLoginMode && (
              <Input
                id="firstName"
                element="input"
                type="text"
                label="First Name"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter your first name"
                onInput={inputHandler}
              />
            )}
            {!isLoginMode && (
              <Input
                id="lastName"
                element="input"
                type="text"
                label="Last Name"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter your last name"
                onInput={inputHandler}
              />
            )}
            <Input
              id="email"
              element="input"
              type="email"
              label="E-mail"
              validators={[VALIDATOR_EMAIL()]}
              errorText="Please enter valid email format"
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
              {isLoginMode ? "LOGIN" : "REGISTER"}
            </Button>
          </form>
          <p>Not a member yet? Create an Account</p>
          <Button inverse onClick={changeModeHandler}>
            {isLoginMode ? " REGISTER" : " LOGIN"}
          </Button>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default Auth;
