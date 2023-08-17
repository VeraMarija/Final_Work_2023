import React, { useContext, useState } from "react";

import { Link } from "react-router-dom";

import "./UserItem.css";
import Avatar from "../../shared/components/UIElements/Avatar";
import Card from "../../shared/components/UIElements/Card";
import { AuthContext } from "../../shared/context/authContext";
import { useHttpHook } from "../../shared/hooks/httpHook";
import { port_string } from "../../config/global";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import Modal from "../../shared/components/UIElements/Modal";
import Button from "../../shared/components/FormElements/Button";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const UserItem = (props) => {
  const auth = useContext(AuthContext);
  // const { isLoading, error, sendRequest, removeError } = useHttpHook();
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
      const response = await fetch(port_string + "/users/" +  props.id, {
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

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={removeError} />
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="user-item__modal-actions"
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
          Do you want to proceed and delete this user? Please note that it can't
          be undone.
        </p>
      </Modal>
      <li className="user-item">
        <div>
          <Card className="user-item__content">
            {isLoading && <LoadingSpinner asOverlay />}
            <Link to={`/profile/${props.id}`}>
              <div className="user-item__image">
                <Avatar image={`http://localhost:3001/uploads/${props.picture}`} alt={props.firstName} />
              </div>
              <div className="user-item__info">
                <h2>{props.firstName + " " + props.lastName} </h2>
                <h3>Profile created: {new Date(props.profileCreated).toLocaleString()}</h3>
                <h3>Role: {props.role}</h3>
              </div>
            </Link>
            <div className="user-item__Update">
              <Link to={`/editUser/${props.id}`} 
                  state= {{
                    userId: props.id,
                    firstName: props.firstName,
                    lastName: props.lastName,
                    email: props.email,
                    role: props.role,
                    picture: props.picture
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

export default UserItem;
