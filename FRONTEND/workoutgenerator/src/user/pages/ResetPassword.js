import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import Button from "../../shared/components/FormElements/Button";
import { port_string } from "../../config/global";
import { useHttpHook } from "../../shared/hooks/httpHook";
import "./ResetPassword.css";
import { AuthContext } from "../../shared/context/authContext";

const ResetPassword = (props) => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  console.log('u resetu otp', auth.otp);
  const { isLoading, error, sendRequest, removeError } = useHttpHook();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {

      const responseData = await sendRequest(
        port_string + "auth/resetPassword",
        "POST",
        JSON.stringify({
          email: data.email,
          password: data.password,
          realOTP: auth.otp,
          enteredOTP: data.enteredOTP
        }),
        {
          "Content-Type": "application/json",
        }
      );
      navigate('/auth');
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
    <div className="resetPassword-form-main">
      <ErrorModal error={error} onClear={removeError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <form className="resetPassword-form" onSubmit={handleSubmit(onSubmit)}>
        <h3>Reset your password</h3>
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
        <label>4 Digit Code</label>
        <input
          type="number"
          name="enteredOTP"
          {...register("enteredOTP", {
            required: "Code is required.",
          })}
        />
        {errors.enteredOTP && (
          <p className="errorMsg">{errors.enteredOTP.message}</p>
        )}
        
        <div className="form-control">
          <label></label>
          <Button type="submit">Reset</Button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
