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
  

  import { COLUMNS } from "../../config/user_columns";
  import { AuthContext } from "../../shared/context/authContext";
  import { port_string } from "../../config/global";
  import ErrorModal from "../../shared/components/UIElements/ErrorModal";
  import Modal from "../../shared/components/UIElements/Modal";
  import Button from "../../shared/components/FormElements/Button";
  import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
  
  const WorkoutTable = (props) => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const auth = useContext(AuthContext);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const navigate = useNavigate();
  
  
    const removeError = () => {
      setError(null);
    };
  
 
    return (
      <div className="container">
        <h2>{props.name}</h2>
        <h4>Workout created at {new Date(props.createdAt).toLocaleString()}</h4>
        <table>
          <tr>
            <th>Exercise</th>
            <th>1 RepMax</th>
            <th>First Set (12-15 reps) </th>
            <th>Second Set (8-12 reps) </th>
            <th>Third Set (5-8 reps)</th>
          </tr>
          {props.userExercises.map((val, key) => {
            return (
              <tr key={key}>
                <td>{val.exercise.name}</td>
                <td>{val.repMax}kg</td>
                <td>{val.firstSet}kg</td>
                <td>{val.secondSet}kg</td>
                <td>{val.thirdSet}kg</td>
              
                
              </tr>
            );
          })}
        </table>
      </div>
    );
  };
  
  export default WorkoutTable;
  