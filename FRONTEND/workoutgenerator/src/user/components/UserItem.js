import React, { useContext, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import "./UserItem.css";
import Card from "../../shared/components/UIElements/Card";
import { AuthContext } from "../../shared/context/authContext";
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
  const navigate = useNavigate();
  const adminProfileDelete = (auth.role === "admin" && props.id == auth.userId) ? true : false;

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
      const response = await fetch(port_string + "/users/" + props.id, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + auth.token.token,
        },
      });

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      if(auth.userId === props.id){
        auth.logout();
        navigate("/");
      }
      else{
        navigate("/users/");
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
          Do you want to proceed and delete this account? Please note that it
          can't be undone.
        </p>
      </Modal>

      <Card className="user-item__content">
        {isLoading && <LoadingSpinner asOverlay />}

        <div className="user-item__image">
          <img src={`http://localhost:3001/uploads/${props.picture}`} />
        </div>
        <div className="user-item__about">
          <div className="user-item__info">
            <h2>{props.firstName + " " + props.lastName} </h2>
            <h3>
             {props.email}
            </h3>
            <h4>
              Profile created:{" "}
              <span>{new Date(props.profileCreated).toLocaleString()}</span>{" "}
            </h4>
          </div>

          <div className="user-item__Update">
            <Link
              to={`/editUser/${props.id}`}
              state={{
                userId: props.id,
                firstName: props.firstName,
                lastName: props.lastName,
                email: props.email,
                role: props.role,
                picture: props.picture,
                isActive: props.isActive,
              }}
            >
              <Button>Edit</Button>
            </Link>
            {auth.role !== "admin" && (
              <div className="user-item__Calories">
                <Link to={`/calories/${props.id}`}>
                  <Button>Calories Plan</Button>
                </Link>
              </div>
            )}
            { props.isActive && !adminProfileDelete &&  (
              <Button danger onClick={showDeleteWarningHandler}>
                DELETE
              </Button>
            )}
          </div>
        </div>
      </Card>
    </React.Fragment>
  );
};

export default UserItem;
