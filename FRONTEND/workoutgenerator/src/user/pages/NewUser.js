import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import "./UserForm.css";
import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import Button from "../../shared/components/FormElements/Button";

import { AuthContext } from "../../shared/context/authContext";
import { port_string } from "../../config/global";
import { useHttpHook } from "../../shared/hooks/httpHook";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import Avatar from "../../shared/components/UIElements/Avatar";
import { useNavigate } from "react-router-dom";

const NewUser = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, removeError } = useHttpHook();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [imgSrc, setImgSrc] = useState("/profile.jpeg");

  const handleImageChange = (e) => {
    setImgSrc(URL.createObjectURL(e.target.files[0]));
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("email", data.email);
      formData.append("password", data.password);
      if (data.picture) {
        formData.append("picture", data.picture[0]);
      }

      const responseData = await sendRequest(
        port_string + "users/",
        "POST",
        formData,
        {
          Authorization: "Bearer " + auth.token.token,
        }
      );
      navigate('/users');
    } catch (err) {}
  };

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
      <form
        className="user-form"
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
      >
        <h3>Create user</h3>
        <label>First Name</label>
        <input
          type="text"
          name="firstName"
          {...register("firstName", {
            required: "First name is required.",
          })}
        />
        {errors.firstName && (
          <p className="errorMsg">{errors.firstName.message}</p>
        )}
        <label>Last Name</label>
        <input
          type="text"
          name="lastName"
          {...register("lastName", {
            required: "Last name is required.",
          })}
        />
        {errors.lastName && (
          <p className="errorMsg">{errors.lastName.message}</p>
        )}
        <label>Email</label>
        <input
          type="text"
          name="email"
          {...register("email", {
            required: "Email is required.",
            pattern: {
              value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
              message: "Email is not valid.",
            },
          })}
        />
        {errors.email && <p className="errorMsg">{errors.email.message}</p>}
        <label>Password</label>
        <input
          type="password"
          name="password"
          {...register("password", {
            required: "Password is required.",
          })}
        />
        {errors.password && (
          <p className="errorMsg">{errors.password.message}</p>
        )}
        <label>Picture</label>
        <input type="file" name="picture" {...register("picture")} onChange={handleImageChange} />
        {errors.picture && <p className="errorMsg">{errors.picture.message}</p>}
        <Avatar
          image={imgSrc} 
          alt="picture-update"
        />
        <div className="form-control">
          <label></label>
          <Button type="submit">Add</Button>
        </div>
      </form>
    </div>
  );

};

export default NewUser;
