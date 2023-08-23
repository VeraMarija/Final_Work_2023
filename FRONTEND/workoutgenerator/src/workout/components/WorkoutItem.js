import React, { useContext, useState } from "react";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import Modal from "../../shared/components/UIElements/Modal";
import Button from "../../shared/components/FormElements/Button";
import { AuthContext } from "../../shared/context/authContext";
import Card from "../../shared/components/UIElements/Card";
import { Link, NavLink } from "react-router-dom";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const WorkoutItem = (props) => {
  const auth = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();
 
  const removeError = () => {
    setError(null);
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={removeError} />
      <div className="main-div">
        <li className="workout-item">
          <div>
            <Card className="workout-item__content">
              {isLoading && <LoadingSpinner asOverlay />}
           
              <a href={`/workoutProfile/${props.id}`}>
              <div className="workout-item__info">
                <h2>{props.name} </h2>
                <h4>Exercises used in workout: </h4>
                { props.userExercises.map( e => <p>{e.exercise.name}</p>)} 
              </div>
              </a>           
            </Card>
          </div>
        </li>
      </div>
    </React.Fragment>
  );
};

export default WorkoutItem;
