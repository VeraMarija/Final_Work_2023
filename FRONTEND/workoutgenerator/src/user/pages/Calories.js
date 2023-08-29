import React, { useContext, useEffect, useState } from "react";

import "./Calories.css";
import { useNavigate, useParams } from "react-router-dom";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { port_string } from "../../config/global";
import { BsPersonFillAdd } from "react-icons/bs";
import Card from "../../shared/components/UIElements/Card";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "../../shared/context/authContext";

const Calories = () => {

    const auth = useContext(AuthContext);
  const [loadedCalories, setLoadedCalories] = useState();
  const [isLoading, setIsLoading] = useState();
  const id = useParams().userId;
  const [error, setError] = useState();
  const navigate = useNavigate();
  const navigateToCreateCalories = () => {
    navigate("/calories/new");
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(port_string + "calories/" + id, {
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
        setLoadedCalories(responseData.calories);
        console.log(responseData);
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

  if(!loadedCalories){
    return (
        <React.Fragment>
          <a>Add your calories plan</a>&nbsp;&nbsp;
          <button onClick={navigateToCreateCalories}>
            <BsPersonFillAdd className="icon" />
          </button>
          <div className="center">
            <Card>
              <h2>No calories plan found.</h2>
            </Card>
          </div>
        </React.Fragment>
      );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={removeError} />
      <div className="main-div">
       
        
        <Card className="calories-item__content">
          {isLoading && <LoadingSpinner asOverlay />}
          <h2>Calories Plan</h2>
          <h3>
            Your calories per day to maintain your weight is:{" "}
            {loadedCalories.TEEmaintain}
          </h3>
          <h3>
            Your calories per day to lose weight is: {loadedCalories.TEEtarget}
          </h3>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default Calories;
