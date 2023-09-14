import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { port_string } from "../../config/global";
import { AuthContext } from "../../shared/context/authContext";

const Reduce1RM = () => {
  const location = useLocation();
    const auth = useContext(AuthContext);
    const id = useParams().exerciseId;
    const navigate = useNavigate();
    const [error, setError] = useState();
    const workoutId =location?.state?.workoutId;

  useEffect(() => {
    const confirmUpgradeHandler = async () => {
      try {
        const response = await fetch(
          port_string + "/userExercise/reduce/" + id,
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
        navigate('/workoutProfile/' + workoutId);

      } catch (error) {
        setError(error.message);
      }
    
    };
    confirmUpgradeHandler();
  }, []);

  return;
};

export default Reduce1RM;
