import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { port_string } from "../../config/global";
import { AuthContext } from "../../shared/context/authContext";

const DeleteUserExercise = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const workoutId = location?.state?.workoutId;
  const id = useParams().exerciseId;
  const auth = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(port_string + "/userExercise/" + id, {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + auth.token.token,
          },
        });

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        navigate("/workoutProfile/" + workoutId);
      } catch (error) {}
    };
    fetchData();
  }, []);

};

export default DeleteUserExercise;
