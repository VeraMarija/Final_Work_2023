import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../shared/context/authContext";
import { Controller } from "react-hook-form";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import Select from "react-select";
import { port_string } from "../../config/global";

const LoadExercises = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [loadedExercises, setLoadedExercises] = useState();
  const auth = useContext(AuthContext);
  const myarray = [];

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
        console.log(responseData.exercises);
        setLoadedExercises(responseData.exercises);
        console.log("loaded", loadedExercises);
        loadedExercises.forEach((exercise) => {
          myarray.push({ label: exercise.name, value: exercise.name });
        });
        console.log("array", myarray);
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="workout-form-main">
      {isLoading && <LoadingSpinner asOverlay />}

      <label>Exercises</label>
      <select name="exercises" id="exercises">
        {loadedExercises.forEach((element) => {
          <option value={element.name}>{element.name}</option>;
        })}
      </select>
    </div>
  );
};

export default LoadExercises;
