import React from "react";

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
          profileCreated = {user.createdAt}
        />
      ))}
    </ul>
  );
};

export default UsersList;
