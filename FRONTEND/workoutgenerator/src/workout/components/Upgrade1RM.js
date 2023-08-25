import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { port_string } from "../../config/global";
import { AuthContext } from "../../shared/context/authContext";

const Upgrade1RM = () => {
    const auth = useContext(AuthContext);
    const id = useParams().exerciseId;
    const navigate = useNavigate();
    const [error, setError] = useState();

  useEffect(() => {
    const confirmUpgradeHandler = async () => {
      try {
        const response = await fetch(
          port_string + "/userExercise/upgrade/" + id,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + auth.token.token,
            },
          }
        );

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        navigate('/workouts/all');

      } catch (error) {
        setError(error.message);
      }
    
    };
    confirmUpgradeHandler();
  }, []);

  return;
};

export default Upgrade1RM;
