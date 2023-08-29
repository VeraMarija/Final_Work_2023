import React, { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "../../shared/context/authContext";
import { useHttpHook } from "../../shared/hooks/httpHook";
import { port_string } from "../../config/global";
import Button from "../../shared/components/FormElements/Button";

const AddExerciseOnWorkout = () => {
  const id = useParams().workoutId;
  const auth = useContext(AuthContext);
  const { sendRequest, removeError } = useHttpHook();
  const [loadedExercises, setLoadedExercises] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
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
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  
  const onSubmit = async (data) => {
    try {
      const responseData = await sendRequest(
        port_string + "workout/addExercise/" + id,
        "PUT",
        JSON.stringify({
          exerciseName: data.exercise,
          liftWeight: data.liftWeight,
          repetition: data.repetition,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token.token,
        }
      );
      navigate('/workoutProfile/' + id)
    } catch (err) {}
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="center">
        <h2>Loading....</h2>
      </div>
    );
  }

  return (
    <div className="exercise-form-main">
      <ErrorModal error={error} onClear={removeError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <form className="exercise-form" onSubmit={handleSubmit(onSubmit)}>
        <h3>Create exercise</h3>
        <label>Select exercise</label>
        <select
          {...register("exercise", {
            required: "Exercise is required.",
          })}
        >
          {!isLoading && loadedExercises && loadedExercises.map((e) => (
            <option value={e.name}>{e.name} </option>
          ))}
        </select>
        <label>How much weight you lift?</label>
        <input
          type="number"
          {...register("liftWeight", {
            required: "Weight is required.",
            min: 10,
            max: 1000,
          })}
        />
        {errors.liftWeight && (
          <p className="errorMsg">{errors.liftWeight.message}</p>
        )}

        <label>How many repetitions?</label>
        <input
          type="number"
          {...register("repetition", {
            required: "Repetition is required.",
            min: 1,
            max: 100,
          })}
        />
        {errors.repetition && (
          <p className="errorMsg">{errors.repetition.message}</p>
        )}

        <div className="form-control">
          <label></label>
          <Button type="submit">Add</Button>
        </div>
      </form>
    </div>
  );
};

export default AddExerciseOnWorkout;
