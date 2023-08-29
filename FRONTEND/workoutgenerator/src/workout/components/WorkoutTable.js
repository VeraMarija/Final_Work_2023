import React, {
  useState,
  useEffect,
  useMemo,
  useContext,
  useCallback,
} from "react";
import { BsPersonFillAdd } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { BiEdit, BiSolidUserDetail, BiSolidUserMinus } from "react-icons/bi";
import { BsGraphUpArrow } from "react-icons/bs";
import "./WorkoutTable.css";
import { COLUMNS } from "../../config/user_columns";
import { AuthContext } from "../../shared/context/authContext";
import { port_string } from "../../config/global";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import Modal from "../../shared/components/UIElements/Modal";
import Button from "../../shared/components/FormElements/Button";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useForm } from "react-hook-form";

const WorkoutTable = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const auth = useContext(AuthContext);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const navigate = useNavigate();

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
      const response = await fetch(port_string + "/workout/" + props.id, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + auth.token.token,
        },
      });

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      navigate("/workouts/all");
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
        footerClass="workout-item__modal-actions"
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
          Do you want to proceed and delete this workout? Please note that it
          can't be undone.
        </p>
      </Modal>

      <div className="container">
        <div className="header-workout">
          <h2>{props.name}</h2>
          <Button danger onClick={showDeleteWarningHandler}>
            DELETE
          </Button>
        </div>

        <h4>Workout created at {new Date(props.createdAt).toLocaleString()}</h4>
        <table>
          <tr>
            <th>Exercise</th>
            <th>1 RepMax</th>
            <th>Increase 1RM</th>
            <th>First Set (12-15 reps) </th>
            <th>Second Set (8-12 reps) </th>
            <th>Third Set (5-8 reps)</th>
            <th>Exercise progress</th>
          </tr>
          {props.userExercises.map((val, key) => {
            return (
              <tr key={key}>
                <td>{val.exercise.name}</td>
                <td>{val.repMax}kg</td>
                <td>
                  <Link
                    to={`/upgrade1RM/${val._id}`}
                    state={{ workoutId: props.id }}
                  >
                    <BsGraphUpArrow className="icon" />
                  </Link>
                </td>
              
                <td>{val.firstSet}kg</td>
                <td>{val.secondSet}kg</td>
                <td>{val.thirdSet}kg</td>
                <td>
                  <Link
                    to={`/chart/${val._id}`}
                    state={{ exerciseName: val.exercise.name }}
                  >
                    <BsGraphUpArrow className="icon" />
                  </Link>
                </td>
              </tr>
            );
          })}
        </table>

        <div className="button-add">
          <Link to={`/addExercise/${props.id}`}>
            <Button>ADD EXERCISE</Button>
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
};

export default WorkoutTable;
