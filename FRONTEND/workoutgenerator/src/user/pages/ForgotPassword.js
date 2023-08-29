import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import Button from "../../shared/components/FormElements/Button";
import { port_string } from "../../config/global";
import { useHttpHook } from "../../shared/hooks/httpHook";
import "./ForgotPassword.css";
import { AuthContext } from "../../shared/context/authContext";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const { isLoading, error, sendRequest, removeError } = useHttpHook();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const random = Math.floor(Math.random() * 9000 + 1000);
    try {
      const responseData = await sendRequest(
        port_string + "auth/forgotPassword",
        "POST",
        JSON.stringify({
          email: data.email,
          otp: random
        }),
        {
          "Content-Type": "application/json",
        }
      );
     
      auth.forgotPasswordOTP(random);
     navigate('/resetPassword');
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
    <div className="forgotPassword-form-main">
      <ErrorModal error={error} onClear={removeError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <form className="forgotPassword-form" onSubmit={handleSubmit(onSubmit)}>
        <h3>Enter email to reset your password</h3>
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
        <div className="form-control">
          <label></label>
          <Button type="submit">Send</Button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
