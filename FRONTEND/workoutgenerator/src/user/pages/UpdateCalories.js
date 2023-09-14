import React, { useContext, useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { VALIDATOR_MIN, VALIDATOR_REQUIRE } from "../../shared/util/validators";
import "./UserForm.css";
import { AuthContext } from "../../shared/context/authContext";
import { useHttpHook } from "../../shared/hooks/httpHook";
import { port_string } from "../../config/global";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import Avatar from "../../shared/components/UIElements/Avatar";

const UpdateCalories = () => {
  const location = useLocation();
  const id = useParams().caloriesId;
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, removeError } = useHttpHook();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userId: location?.state?.userId,
      weeks: location?.state?.weeks,
      currentWeight: location?.state?.currentWeight,
      targetWeight: location?.state?.targetWeight,
      height: location?.state?.height,
      age: location?.state?.age,
      activity: location?.state?.activity,
      
    },
  });
  const genderData =  location?.state?.gender;

  const updateOnSubmit = async (data) => {
    console.log('data', data);
    try {
        console.log('data', data);
        const responseData = await sendRequest(
            port_string + "calories/" + id,
            "PUT",
            JSON.stringify({
                userId: auth.userId,
                weeks: data.weeks,
                currentWeight: data.currentWeight,
                targetWeight: data.targetWeight,
                height: data.height,
                age: data.age,
                gender:genderData,
                activity: data.activity
            }),
            {
              "Content-Type": "application/json",
              Authorization: "Bearer " + auth.token.token,
            }
          );
        navigate("/calories/" + data.userId);
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
    <div className="calories-form-main">
      <ErrorModal error={error} onClear={removeError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <form
        className="calories-form"
        onSubmit={handleSubmit(updateOnSubmit)}
      >
        <h3>Update Calories Plan</h3>
        <label>Age</label>
        <input
          type="number"
          name="age"
          {...register("age", {
            required: "Age is required.",
            min: 12,
          })}
        />
        {errors.age && (
          <p className="errorMsg">{errors.age.message}</p>
        )}
        <label>Your current weight</label>
        <input
          type="number"
          name="currentWeight"
          {...register("currentWeight", {
            required: "Weight is required.",
            min: 30,
          })}
        />
        {errors.weight && <p className="errorMsg">{errors.weight.message}</p>}
        <label>Your height</label>
        <input
          type="number"
          name="height"
          {...register("height", {
            required: "Height is required.",
            min: 100,
          })}
        />
        {errors.height && <p className="errorMsg">{errors.height.message}</p>}
        <label>Your target weight</label>
        <input
          type="number"
          name="targetWeight"
          {...register("targetWeight", {
            required: "TargetWeight is required.",
            min: 30,
          })}
        />
        {errors.targetWeight && <p className="errorMsg">{errors.targetWeight.message}</p>}
        <label>In how much weeks do you want to reach target weight</label>
        <input
          type="number"
          name="weeks"
          {...register("weeks", {
            required: "Weeks are required.",
            min: 1,
          })}
        />
        {errors.weeks && <p className="errorMsg">{errors.weeks.message}</p>}
        <div className="radio-div">
        <label>
          <div className="set-margin">
            <input
              type="radio"
              value="moderatelyActive"
              name="moderatelyActive"
              {...register("activity")}
            />
       Moderately active
          </div>
        </label>
        <label>
          <div className="set-margin">
            <input
              type="radio"
              value="vigorouslyActive"
              name="vigorouslyActive"
              {...register("activity")} 
            />
            Vigorously active
          </div>
        </label>
        <label>
          <div>
            <input
              type="radio"
              value="extremelyActive"
              name="extremelyActive"
              {...register("activity")} 
            />
            Extremely active
          </div>
        </label>
        </div>
        <div className="form-control">
          <label></label>
          <Button type="submit">Edit</Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateCalories;
