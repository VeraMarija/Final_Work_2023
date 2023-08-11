import React, { useContext } from "react";
import { Link } from "react-router-dom";

import "./UserItem.css";
import Avatar from "../../shared/components/UIElements/Avatar";
import Card from "../../shared/components/UIElements/Card";
import { AuthContext } from "../../shared/context/authContext";

const UserItem = (props) => {
  const auth = useContext(AuthContext);

  return (
    <li className="user-item">
      <div>
        <Card className="user-item__content">
          <Link to={`/${props.id}/profile`}>
            <div className="user-item__image">
              <Avatar image={props.picture} alt={props.firstName} />
            </div>
            <div className="user-item__info">
              <h2>{props.firstName + " " + props.lastName} </h2>
              <h3>Profile created: {props.profileCreated}</h3>
              <h3>Role: {props.role}</h3>
            </div>
          </Link>
          <div className="user-item__exercises">
            <Link to={`/${props.id}/userExercises`}>
              <h2>Exercises</h2>
            </Link>
          </div>
        </Card>
      </div>
    </li>
  );
};

export default UserItem;
