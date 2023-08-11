import React, { useState, useContext } from "react";

import "./UserExerciseItem.css";

import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import { AuthContext } from "../../shared/context/authContext";

const UserExerciseItem = (props) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const auth = useContext(AuthContext);

  const showDeleteWarning = () => {
    setShowConfirm(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirm(false);
  };

  const confirmDelete = () => {
    cancelDeleteHandler();
    console.log("DELEEEEEETEEEEEEE!!!!!!");
  };

  return (
    <React.Fragment>
      <li className="user-exercise-item">
        <div>
          <Card className="user-exercise-item__content">
            <div className="user-exercise-item__info">
              <h2>Exercise name: {props.name}</h2>
              <h3>User: {props.user}</h3>
              <h4>Exercise lift weight: {props.liftWeight}</h4>
              <h4>exercise repetition: {props.repetition}</h4>
            </div>
            <Modal
              show={showConfirm}
              header="Are you sure?"
              footerClass="user-exercise-item__modal-actions"
              footer={
                <React.Fragment>
                  <Button onClick={confirmDelete} dange>
                    DELETE
                  </Button>
                  <Button onClick={cancelDeleteHandler} inverse>CANCEL</Button>
                </React.Fragment>
              }
            >
              <p>Do you want to delete the exercise?</p>
            </Modal>
            <div className="user-exercise-item__actions">
              {auth.isLoggedIn && <Button to={`/userExercise/${props.id}`}>EDIT</Button>}
              {auth.isLoggedIn && <Button onClick={showDeleteWarning} danger>DELETE</Button>}
            </div>
          </Card>
        </div>
      </li>
    </React.Fragment>
  );
};

export default UserExerciseItem;
