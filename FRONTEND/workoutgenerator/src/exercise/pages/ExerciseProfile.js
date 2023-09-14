import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import "../components/ExerciseItem.css";
import "./ExerciseProfile.css";
import { AuthContext } from "../../shared/context/authContext";
import { port_string } from "../../config/global";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ExerciseItem from "../components/ExerciseItem";

const ExerciseProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [loadedExercise, setLoadedExercise] = useState();
  const auth = useContext(AuthContext);

  const id = useParams().exerciseId;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(port_string + "exercises/" + id, {
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
        setLoadedExercise(responseData.loadedExercise);
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
      {!isLoading && loadedExercise && (
        
        <ExerciseItem
          key={loadedExercise._id}
          id={loadedExercise._id}
          name={loadedExercise.name}
          instructions={loadedExercise.instructions}
          equipment={loadedExercise.equipment}
          picture={loadedExercise.picture}
        />
       
      )}
    </React.Fragment>
  );
};

export default ExerciseProfile;
