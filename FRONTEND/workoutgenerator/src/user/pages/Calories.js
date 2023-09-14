import React, { useContext, useEffect, useState } from "react";

import "./Calories.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { port_string } from "../../config/global";
import { BsPersonFillAdd } from "react-icons/bs";
import Card from "../../shared/components/UIElements/Card";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "../../shared/context/authContext";
import Button from "../../shared/components/FormElements/Button";

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

  const deleteHandler =  async () => {
    console.log('helooooooo');
    setIsLoading(true);
    try {
      const response = await fetch(port_string + "/calories/" + loadedCalories._id, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + auth.token.token,
        },
      });

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }
     navigate('/profile/' + id);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
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

  if (!loadedCalories) {
    return (
      <React.Fragment>
        <Card className="adding-calories">
          <span>Add your calories plan</span>&nbsp;&nbsp;
          <button onClick={navigateToCreateCalories}>
            <BsPersonFillAdd className="icon" />
          </button>
        </Card>
        {/* <a>Add your calories plan</a>&nbsp;&nbsp;
        <button onClick={navigateToCreateCalories}>
          <BsPersonFillAdd className="icon" />
        </button> */}
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={removeError} />

      <Card className="calories-item__content">
        {isLoading && <LoadingSpinner asOverlay />}
        <div>
          <h2>Calories Plan</h2>
        </div>
        <div>
          <h4>
            Current weight : &nbsp;
            <span>{loadedCalories.currentWeight} kg </span>
          </h4>
          <h4>
            Target weight : &nbsp;
            <span>{loadedCalories.targetWeight} kg </span>
          </h4>
          <h4>
            Your calories per day to maintain your weight is &nbsp;
            <span>{loadedCalories.TEEmaintain} kcal </span>
          </h4>
          <h4>
            To loose weight you should eat less then &nbsp;
            <span>{loadedCalories.TEEtarget} kcal</span>
          </h4>
          <h4>
            In order to loose{" "}
            {loadedCalories.currentWeight - loadedCalories.targetWeight} kg in{" "}
            {loadedCalories.weeks} weeks you should eat everyday &nbsp;
            <span>
              {loadedCalories.TEEmaintain - loadedCalories.calorieDeficit} kcal.{" "}
            </span>
          </h4>

          <div className="calories-item__Update">
            <Link
              to={`/editCalories/${loadedCalories._id}`}
              state={{
                caloriesId: loadedCalories._id,
                userId: loadedCalories.user,
                weeks: loadedCalories.weeks,
                currentWeight: loadedCalories.currentWeight,
                targetWeight: loadedCalories.targetWeight,
                height: loadedCalories.height,
                age:loadedCalories.age,
                gender:loadedCalories.gender,
                activity: loadedCalories.activity
              }}
            >
              <Button>Edit</Button>
            </Link>
            <Button danger onClick={deleteHandler}>
              DELETE
            </Button>
          </div>
        </div>
      </Card>
    </React.Fragment>
  );
};

export default Calories;
