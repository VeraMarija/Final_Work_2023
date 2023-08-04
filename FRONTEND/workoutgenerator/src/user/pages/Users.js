import React from "react";

import UsersList from "../components/UsersList";
import './Users.css';


const USERS = [
  {
    id: "u1",
    image:
      "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    name: "Ana",
  },
  {
    id: "u2",
    image:
      "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    name: "Ivana",
  },
  {
    id: "u3",
    image:
      "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    name: "Klara",
  },
];

const Users = () => {

  return (
    <div className="main">
      <UsersList items={USERS} />
    </div>
  );
};

export default Users;
