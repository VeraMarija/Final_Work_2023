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
  //const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();

  /*  const showDeleteWarningHandler = () => {
      setShowConfirmModal(true);
    };
  
    const cancelDeleteHandler = () => {
      setShowConfirmModal(false);
    };
  
    const confirmDeleteHandler = async () => {
      setShowConfirmModal(false);
  
      setIsLoading(true);
      try {
        const response = await fetch(port_string + "/workout/" +  props.id, {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + auth.token.token,
          },
        });
  
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
  
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    }; */

  const removeError = () => {
    setError(null);
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={removeError} />
      {/* <Modal
          show={showConfirmModal}
          onCancel={cancelDeleteHandler}
          header="Are you sure?"
          footerClass="workout-item__modal-actions"
          footer={
            <React.Fragment>
              <Button inverse onClick={cancelDeleteHandler}>
                CANCEL
              </Button>
              <Button danger onClick={confirmDeleteHandler}>
                DELETE
              </Button>
            </React.Fragment>
          }
        >
          <p>
            Do you want to proceed and delete this workout? Please note that it can't
            be undone.
          </p>
        </Modal> */}
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

              {/* <div className="workout-item__Update">
                <Link to={`/editWorkout/${props.id}`} 
                    state= {{
                      name: props.name,
                      instructions: props.instructions,
                      equipment: props.equipment,               
                    }}
                >
                  <h2>Edit</h2>
                </Link>
                <Button danger onClick={showDeleteWarningHandler}>
                  DELETE
                </Button>
              </div> */}
            </Card>
          </div>
        </li>
      </div>
    </React.Fragment>
  );
};

export default WorkoutItem;
