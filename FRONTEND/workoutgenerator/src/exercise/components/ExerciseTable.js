import React, { useState, useEffect, useContext } from "react";
import { BsPersonFillAdd } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { BiEdit, BiSolidUserDetail, BiSolidUserMinus } from "react-icons/bi";

import "./ExerciseTable.css";
import { COLUMNS } from "../../config/user_columns";
import { AuthContext } from "../../shared/context/authContext";
import { port_string } from "../../config/global";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import Modal from "../../shared/components/UIElements/Modal";
import Button from "../../shared/components/FormElements/Button";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import Card from "../../shared/components/UIElements/Card";

const ExerciseTable = (props) => {
  const auth = useContext(AuthContext);

  const navigate = useNavigate();

  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No exercises found.</h2>
        </Card>
      </div>
    );
  }

  const navigateToCreateExercise = () => {
    navigate("/exercise/new");
  };

  return (
    <div className="container">
      <a>Add new exercise</a>&nbsp;&nbsp;
      <button onClick={navigateToCreateExercise}>
        <BsPersonFillAdd className="icon" />
      </button>
      <table>
        <tr>
          <th>Name</th>
          <th>Instructions</th>
          <th>Equipment</th>
          <th>Details</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
        {props.items.map((val, key) => {
          return (
            <tr key={key}>
              <td>{val.name}</td>
              <td>{val.instructions}</td>
              <td>
                {val.equipment.map((e) => (
                  <p>{e}</p>
                ))}
              </td>
              <td>
                <Link to={`/exerciseProfile/${val._id}`}>
                  <BiSolidUserDetail className="icon" />
                </Link>
              </td>
              <td>
                <Link
                  to={`/editExercise/${val._id}`}
                  state={{
                    name: val.name,
                    instructions: val.instructions,
                    equipment: val.equipment,
                  }}
                >
                  <BiEdit className="icon" />
                </Link>
              </td>
              <td>
                <Link to={`/exerciseProfile/${val._id}`}>
                  <BiSolidUserMinus className="icon" />
                </Link>
              </td>
            </tr>
          );
        })}
        ;
      </table>
    </div>
  );
};

export default ExerciseTable;