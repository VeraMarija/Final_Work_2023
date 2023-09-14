import React, { useContext, useEffect, useState } from "react";

import { Line } from "react-chartjs-2";
import "./ChartExercise2.css";

import { AuthContext } from "../../shared/context/authContext";
import { useLocation, useParams } from "react-router-dom";
import { port_string } from "../../config/global";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip
);

const ChartExercise2 = () => {
  const location = useLocation();
  const exerciseName = location?.state?.exerciseName;
  const auth = useContext(AuthContext);
  const id = useParams().exerciseId;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [dataArray, setDataArray] = useState();
  const [timeArray, setTimeArray] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(port_string + "repMax/" + id, {
          method: "GET",
          headers: {
            Authorization: "Bearer " + auth.token.token,
          },
        });
        const responseData = await response.json();
        const dataArray = [];
        const timeArray = [];
        for (let i of responseData.repMax) {
          let t1 = new Date(i.createdAt).toLocaleString();
          let t = t1.split(",")[0];
          timeArray.push(t);
          let d = i.repMax;
          dataArray.push(d);
        }
        setDataArray(dataArray);
        setTimeArray(timeArray);

        if (!response.ok) {
          throw new Error(responseData.message);
        }
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

  const data = {
    labels: timeArray,
    datasets: [
      {
        label: "Exercise weight",
        data: dataArray,
        backgroundColor: "blue",
        borderColor: "blue",
        color: "blue",
        tension: 0.3,
        fill: true
      },
    ],
  };
const options = {
    scales : {
        y : {}
    }
}

  return (
    <div className="chart">
      <ErrorModal error={error} onClear={removeError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <Line data={data} options={options}></Line>
    </div>
  );
};

export default ChartExercise2;
