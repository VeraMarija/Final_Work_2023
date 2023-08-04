import React from "react";
import { Link } from "react-router-dom";

import "./UserItem.css";
import Avatar from "../../shared/components/UIElements/Avatar";
import Card from "../../shared/components/UIElements/Card";

const UserItem = (props) => {
  return (
    <li className="user-item">
      <div>
        <Card className="user-item__content">
          <Link to={`/${props.id}/profile`}>
            <div className="user-item__image">
              <Avatar image={props.image} alt={props.name} />
            </div>
            <div className="user-item__info">
              <h2>{props.name}</h2>
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
