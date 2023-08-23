import React, { useEffect, useState, useContext } from "react";

import ExercisesList from "../components/ExercisesList";
import "./Exercises.css";
import { port_string } from "../../config/global";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "../../shared/context/authContext";
import ExerciseTable from "../components/ExerciseTable";


const Exercises = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [loadedExercises, setLoadedExercises] = useState();
  const auth = useContext(AuthContext);
 
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

  const errorClearHandler = () => {
    setError(null);
  };

  return (
    <React.Fragment>
      <div className="exercisesdiv">
      <ErrorModal error={error} onClear={errorClearHandler} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedExercises && <ExerciseTable items={loadedExercises} />}
      </div>
    </React.Fragment>
  );
};

export default Exercises;
