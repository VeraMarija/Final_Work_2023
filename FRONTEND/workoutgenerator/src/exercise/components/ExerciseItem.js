import React, { useContext, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
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
      const response = await fetch(port_string + "/exercises/" + props.id, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + auth.token.token,
        },
      });

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      navigate("/exercises");
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
          Do you want to proceed and delete this exercise? Please note that it
          can't be undone.
        </p>
      </Modal>

      <Card className="exercise-item__content">
        {isLoading && <LoadingSpinner asOverlay />}
        <div className="exercise-item__image">
          <img src={`http://localhost:3001/uploads/${props.picture}`} />
        </div>
        <div className="exercise-item__about">
          <div className="exercise-item__info">
            <Link to={`/exerciseProfile/${props.id}`}>
              {/*   <div className="user-item__image">
                <Avatar image={`http://localhost:3001/uploads/${props.picture}`} alt={props.firstName} />
              </div> */}

              <h2>{props.name} </h2>
              <h3>
                Instructions:<span>{props.instructions}</span>
              </h3>
              <h3>
                Equipment:
                {props.equipment.map((e) => (
                  <span>{e}</span>
                ))}
              </h3>
            </Link>
          </div>
          {auth.role === "admin" && (
            <div className="exercise-item__Update">
              <Link
                to={`/editExercise/${props.id}`}
                state={{
                  name: props.name,
                  instructions: props.instructions,
                  equipment: props.equipment,
                  picture: props.picture
                }}
              >
                <Button>Edit</Button>
              </Link>
              <Button danger onClick={showDeleteWarningHandler}>
                DELETE
              </Button>
            </div>
          )}
        </div>
      </Card>
    </React.Fragment>
  );
};

export default ExerciseItem;
