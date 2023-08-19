import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";


import "./Workouts.css";
import { port_string } from "../../config/global";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "../../shared/context/authContext";
import WorkoutList from "../components/WorkoutList";


const Workouts = () => {


  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [loadedWorkouts, setLoadedWorkouts] = useState();
  const auth = useContext(AuthContext);
  const id = auth.userId;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(port_string + "workout/allByUserId/" + id , {
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
        setLoadedWorkouts(responseData.workouts);
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
      {!isLoading && loadedWorkouts && (
        <WorkoutList items={loadedWorkouts} />
      )}
    </React.Fragment>
  );
};

export default Workouts;
