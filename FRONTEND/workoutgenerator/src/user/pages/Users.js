import React, { useEffect, useState, useContext } from "react";

import UsersList from "../components/UsersList";
import "./Users.css";
import { port_string } from "../../config/global";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "../../shared/context/authContext";
import { useHttpHook } from "../../shared/hooks/httpHook";
import { Link } from "react-router-dom";

const Users = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [loadedUsers, setLoadedUsers] = useState();
  const auth = useContext(AuthContext);
  // const { isLoading, error, sendRequest, removeError } = useHttpHook();

  //useeffect does not want a promise
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
        setLoadedUsers(responseData.users);
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const errorClearHandler = () => {
    setError(null);
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorClearHandler} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
    </React.Fragment>
  );
};

export default Users;
