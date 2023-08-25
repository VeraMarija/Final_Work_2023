import React from "react";
import { useNavigate } from "react-router-dom";
import { BsPersonFillAdd } from "react-icons/bs";

import "./UsersList.css";
import UserItem from "./UserItem";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";

const UsersList = (props) => {
  const navigate = useNavigate();
  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No users found.</h2>
        </Card>
      </div>
    );
  }

  const navigateToCreateUser = () => {
    navigate("/user/new");
  };
  return (
    <React.Fragment>
      <div className="users-list-main">
        <p className="p-add-user">Add new user</p>
        <button onClick={navigateToCreateUser}>
          <BsPersonFillAdd className="add-icon" />
        </button>

        <ul className="users-list">
          {props.items.map((user) => (
            <UserItem
              key={user._id}
              id={user._id}
              picture={user.picture}
              firstName={user.firstName}
              lastName={user.lastName}
              email={user.email}
              role={user.role}
              profileCreated={user.createdAt}
              profileUpdated={user.updatedAt}
              isActive={user.isActive}
              height={user.height}
              weight={user.weight}
            />
          ))}
        </ul>
      </div>
    </React.Fragment>
  );
};

export default UsersList;
