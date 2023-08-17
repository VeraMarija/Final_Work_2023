import React from "react";
import { Link } from "react-router-dom";
import "./UsersList.css";
import UserItem from "./UserItem";
import Card from "../../shared/components/UIElements/Card";

const UsersList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No users found.</h2>
        </Card>
      </div>
    );
  }

  return (
    <React.Fragment>
       <div className="link-to">
        <Link to={`/user/new`}>
          <div className="link-div">
          <h2>CREATE NEW USER</h2>
          </div>
        </Link>
      </div>
      <div className="users-list-main">
     

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
          />
        ))}
      </ul>
      </div>
    </React.Fragment>
  );
};

export default UsersList;
