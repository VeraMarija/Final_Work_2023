import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import { AuthContext } from "../../shared/context/authContext";
import { port_string } from "../../config/global";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import WorkoutTable from "../components/WorkoutTable";

const WorkoutProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [loadedWorkout, setLoadedWorkout] = useState();
  const auth = useContext(AuthContext);

  const id = useParams().workoutId;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(port_string + "workout/" + id, {
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
        setLoadedWorkout(responseData.loadedWorkout);
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
      <ErrorModal error={error} onClear={errorClearHandler} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedWorkout && (
        <WorkoutTable
          id={loadedWorkout._id}
          name={loadedWorkout.name}
          userExercises={loadedWorkout.userExercises}
          user={loadedWorkout.user}
          createdAt = {loadedWorkout.createdAt}
        />
      )}
    </React.Fragment>
  );
};

export default WorkoutProfile;
