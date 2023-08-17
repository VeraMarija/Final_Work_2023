import React from "react";
import { Link } from "react-router-dom";
import "./ExercisesList.css";
import ExerciseItem from "./ExerciseItem";
import Card from "../../shared/components/UIElements/Card";

const ExercisesList = (props) => {
  if (props.items.length === 0) {
    return (
        <React.Fragment>
      <div className="center">
        <Card>
          <h2>No exercises found.</h2>
        </Card>
      </div>
      <div className="link-to">
      <Link to={`/exercise/new`}>
        <div className="link-div">
        <h2>CREATE NEW EXERCISE</h2>
        </div>
      </Link>
    </div>
    </React.Fragment>
      
    );
  }

  return (
    <React.Fragment>
      <div className="exercises-list-main">
      <div className="link-to">
        <Link to={`/exercise/new`}>
          <div className="link-div">
          <h2>CREATE NEW EXERCISE</h2>
          </div>
        </Link>
      </div>

      <ul className="exercises-list">
        {props.items.map((exercise) => (
          <ExerciseItem
            key={exercise._id}
            id={exercise._id}
            name={exercise.name}
            instructions={exercise.instructions}
            equipment={exercise.equipment}
          />
        ))}
      </ul>
      </div>
    </React.Fragment>
  );
};

export default ExercisesList;
