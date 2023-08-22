import React, { useContext, useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../shared/context/authContext";
import { useHttpHook } from "../../shared/hooks/httpHook";
import "./WorkoutForm.css";
import { port_string } from "../../config/global";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import Button from "../../shared/components/FormElements/Button";

const NewWorkout = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [loadedExercises, setLoadedExercises] = useState();
  const { error, sendRequest, removeError } = useHttpHook();
  const [isLoading, setIsLoading] = useState();
  const [clicked, setClicked] = useState(false);
  const {
    control,
    reset,
    watch,
    trigger,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "userExercises",
  });

  const watchWeight = watch("liftWeight", false);
  const watchRepetition = watch("repetition", false);
  const watchExercise = watch("exercise", false);

  const fetchExercises = async () => {
    try {
      const response = await fetch(port_string + "exercises/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token.token,
          User: auth.userId,
        },
      });
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }
      setLoadedExercises(responseData.exercises);
      setClicked(true);
      setIsLoading(false);
    } catch (error) {}
  };

  const onSubmitWorkout = async (data) => {
    try {
      const responseData = await sendRequest(
        port_string + "workout/",
        "POST",
        JSON.stringify({
          name: data.name,
          user: auth.userId,
          userExercises: data.userExercises,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token.token,
        }
      );
      setIsLoading(false);
      const workoutId = responseData.createdWorkout._id.toString();
      navigate(`/workoutProfile/${workoutId}`);
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
    <div className="workout-form-main">
      <ErrorModal error={error} onClear={removeError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <form className="workout-form" onSubmit={handleSubmit(onSubmitWorkout)}>
        <h3>Create your own workout</h3>
        <label>Workout Name</label>
        <input
          type="text"
          name="name"
          {...register("name", {
            required: "Name is required.",
          })}
        />
        {errors.name && <p className="errorMsg">{errors.name.message}</p>}

        <button type="button" onClick={fetchExercises}>
          click to choose exercises
        </button>
        {clicked && (
          <React.Fragment>
            <ul>
              {fields.map((item, index) => (
                <li key={item.id}>
                  <label>Select exercise in workout</label>
                  <select
                    {...register(`userExercises.${index}.exercise`, {
                      required: "Name is required.",
                    })}
                  >
                    {loadedExercises.map((e) => (
                      <option value={e.name}>{e.name} </option>
                    ))}
                  </select>

                  <label>How much weight you lift?</label>
                  <input
                    type="number"
                    {...register(`userExercises.${index}.liftWeight`, {
                      required: "Weight is required.",
                      min: 10,
                      max: 1000,
                    })}
                  />

                  <label>How many repetitions?</label>
                  <input
                    type="number"
                    {...register(`userExercises.${index}.repetition`, {
                      required: "Repetition is required.",
                      min: 1,
                      max: 100,
                    })}
                  />
                  {errors.repetition && (
                    <p className="errorMsg">{errors.repetition.message}</p>
                  )}
                  <button type="button" onClick={() => remove(index)}>
                    Delete
                  </button>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() =>
                append({
                  exercise: watchExercise,
                  liftWeight: watchWeight,
                  repetition: watchRepetition,
                })
              }
            >
              Add exercise
            </button>
          </React.Fragment>
        )}
        <div className="form-control">
          <label></label>
          <Button type="submit">Add</Button>
        </div>
      </form>
    </div>
  );
};

export default NewWorkout;
