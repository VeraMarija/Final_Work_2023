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

import "./UserTable.css";
import { COLUMNS } from "../../config/user_columns";
import { AuthContext } from "../../shared/context/authContext";
import { port_string } from "../../config/global";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import Modal from "../../shared/components/UIElements/Modal";
import Button from "../../shared/components/FormElements/Button";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const UserTable = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const auth = useContext(AuthContext);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const navigate = useNavigate();

  for (var i of data) {
    for (var j in i) {
      if (j === "createdAt") i[j] = new Date(i[j]).toLocaleString();
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        console.log("token", auth.token);
        const response = await fetch(port_string + "users/all", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.token.token,
            User: auth.userId,
          },
        });
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setData(responseData.users);
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const removeError = () => {
    setError(null);
  };

  const navigateToCreateUser = () => {
    navigate("/user/new");
  };

  return (
    <div className="container">
      <a>Add new user</a>&nbsp;&nbsp;
      <button onClick={navigateToCreateUser}>
        <BsPersonFillAdd className="icon" />
      </button>
      <table>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Profile Created</th>
          <th>Profile Updated</th>
          <th>Role</th>
          <th>Profile</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
        {data.map((val, key) => {
          return (
            <tr key={key}>
              <td>{val.firstName}</td>
              <td>{val.lastName}</td>
              <td>{val.email}</td>
              <td>{val.createdAt}</td>
              <td>{val.updatedAt}</td>
              <td>{val.role}</td>
              <td>
                <Link to={`/profile/${val._id}`}>
                  <BiSolidUserDetail className="icon" />
                </Link>
              </td>
              <td>
                <Link
                  to={`/editUser/${val._id}`}
                  state={{
                    userId: val._id,
                    firstName: val.firstName,
                    lastName: val.lastName,
                    email: val.email,
                    role: val.role,
                    picture: val.picture,
                  }}
                >
                  <BiEdit className="icon" />
                </Link>
              </td>
              <td>
                <Link to={`/profile/${val._id}`}>
                  <BiSolidUserMinus className="icon" />
                </Link>
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default UserTable;
