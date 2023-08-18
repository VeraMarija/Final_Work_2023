import React, { useContext, useState } from "react";

import { Link } from "react-router-dom";

import "./ExerciseItem.css";
import Avatar from "../../shared/components/UIElements/Avatar";
import Card from "../../shared/components/UIElements/Card";
import { AuthContext } from "../../shared/context/authContext";
import { port_string } from "../../config/global";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import Modal from "../../shared/components/UIElements/Modal";
import Button from "../../shared/components/FormElements/Button";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const ExerciseItem = (props) => {
  const auth = useContext(AuthContext);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);

    setIsLoading(true);
    try {
      const response = await fetch(port_string + "/exercises/" +  props.id, {
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
  };

  const removeError = () => {
    setError(null);
  };
  console.log(props.equipment);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={removeError} />
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="exercise-item__modal-actions"
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
          Do you want to proceed and delete this exercise? Please note that it can't
          be undone.
        </p>
      </Modal>
      <li className="exercise-item">
        <div>
          <Card className="exercise-item__content">
            {isLoading && <LoadingSpinner asOverlay />}
            <Link to={`/exerciseProfile/${props.id}`}>
            {/*   <div className="user-item__image">
                <Avatar image={`http://localhost:3001/uploads/${props.picture}`} alt={props.firstName} />
              </div> */}
              <div className="exercise-item__info">
                <h2>{props.name} </h2>
                <h3>Instructions:<h4>{props.instructions}</h4></h3>
                <h3>Equipment:
                { props.equipment.map( e => <h4>{e}</h4>)}</h3>
              </div>
            </Link>
            <div className="exercise-item__Update">
              <Link to={`/editExercise/${props.id}`} 
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
            </div>
          </Card>
        </div>
      </li>
    </React.Fragment>
  );
};

export default ExerciseItem;
