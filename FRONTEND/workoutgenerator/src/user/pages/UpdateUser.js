import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { VALIDATOR_MIN, VALIDATOR_REQUIRE } from "../../shared/util/validators";
import "./UserForm.css";
import { useForm } from "../../shared/hooks/formHook";
import { AuthContext } from "../../shared/context/authContext";
import { useHttpHook } from "../../shared/hooks/httpHook";
import { port_string } from "../../config/global";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";


let data;
let formDataExtended;
let finalDataExtended;

const UpdateUser = () => {
  const id = useParams().id;
  const auth = useContext(AuthContext);
  const [loadedUser, setLoadedUser] = useState();
  const { isLoading, error, sendRequest, removeError } = useHttpHook();

  data = {
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
  };


  
  if (auth.role === "admin") {
     data = {
      ...data,
      role: {
        value: "",
        isValid: false,
      },
    };
  }

  
/*try { probaj prvo fetcaht usera
    const response = await fetch(port_string + "/users/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth.token.token,
      },
    });
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.message);
    }
    setLoadedUser(responseData.loadedUser);
  } catch (error) {
    setError(error.message);
  }*/ 

  const [formState, inputHandler, setFormData] = useForm(data, false);

  const updateSubmitHandler = async (event) => {
    event.preventDefault();
    try {
        formDataExtended = {
        firstName: formState.inputs.firstName.value,
        lastName: formState.inputs.lastName.value,
        email: formState.inputs.email.value,
      };
      
      if (auth.role === "admin") {
        formDataExtended = {
          ...formDataExtended,
          role: formState.inputs.role.value,
        };
      }

      const responseData = await sendRequest(
        port_string + "users/" + id,
        "PUT",
        JSON.stringify(formDataExtended),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token.token,
        }
      );

      setLoadedUser(responseData.updatedUser);
    } catch (err) {}
  };

  useEffect(() => {
    if (loadedUser) {
        finalDataExtended = {
        firstName: {
          value: loadedUser.firstName,
          isValid: true,
        },
        lastName: {
          value: loadedUser.lastName,
          isValid: true,
        },
        email: {
          value: loadedUser.email,
          isValid: true,
        },
      };
     
      if (auth.role === "admin") {
         finalDataExtended = {
          ...finalDataExtended,
          role: {
            value: loadedUser.role,
            isValid: true,
          },
        };
      }

      setFormData(finalDataExtended, true);
    }
    //setIsLoading(false);
  }, [setFormData, loadedUser]);

  if (isLoading) {
    return (
      <div className="center">
        <h2>Loading....</h2>
      </div>
    );
  }

  return (
    <div className="user-form-main">
      <ErrorModal error={error} onClear={removeError} />
      {isLoading && <LoadingSpinner asOverlay />}

      <form className="user-form" onSubmit={updateSubmitHandler}>
        <h3>Update user:</h3>
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
     
        {auth.role === "admin" && (
          <Input
            id="role"
            element="input"
            type="role"
            label="Role"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid text"
            onInput={inputHandler}
          />
        )}
        <Button type="subit" disabled={!formState.isValid}>
          UPDATE USER
        </Button>
      </form>
    </div>
  );
};

export default UpdateUser;
