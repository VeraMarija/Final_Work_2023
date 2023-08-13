import React, { useState,useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import "../components/UserItem.css";
import { AuthContext } from "../../shared/context/authContext";
import { port_string } from "../../config/global";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import UserItem from "../components/UserItem";


const UserProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [loadedUser, setLoadedUser] = useState();
  const auth = useContext(AuthContext);

  const id = useParams().userId;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(port_string + "/users/" + id, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.token.token,
          },
        });
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setLoadedUser(responseData.loadedUser);
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
      {!isLoading && loadedUser && (
        <UserItem
          key={loadedUser._id}
          id={loadedUser._id}
          picture={loadedUser.picture}
          firstName={loadedUser.firstName}
          lastName={loadedUser.lastName}
          email={loadedUser.email}
          role={loadedUser.role}
          profileCreated={loadedUser.createdAt}
        />
      )}
    </React.Fragment>
  );
};

export default UserProfile;
