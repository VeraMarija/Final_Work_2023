import React, { useContext, useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import "./ChartExercise.css";
import { AuthContext } from "../../shared/context/authContext";
import { useLocation, useParams } from "react-router-dom";
import { port_string } from "../../config/global";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const ChartExercise = () => {
  const location = useLocation();
  const exerciseName = location?.state?.exerciseName;
  const auth = useContext(AuthContext);
  const id = useParams().exerciseId;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [data, setData] = useState();

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

        /*  let loadedVal = loadedRepMax.map((rpM) => rpM.repMax);
        setRepMaxValues(loadedVal); //vrijednosti vježbe u kilogramima;
        let loadedDates = loadedRepMax.map((rpM) =>
          new Date(rpM.createdAt).toLocaleString()
        );
        setRepMaxDates(loadedDates); */
        const dataArray = [];
        console.log("loadedrepmax", responseData.repMax);
        for (let i of responseData.repMax) {
          let t1 = new Date(i.createdAt).toLocaleString();
          let t = t1.split(",")[0];
          let d = {
            date: t,
            value: i.repMax,
            pv: 2400,
            amt: 2400,
          };

          dataArray.push(d);
        }
        setData(dataArray);
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

  return (
    <div className="chart">
      <ErrorModal error={error} onClear={removeError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <h2>{exerciseName}</h2>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;kg</p>
      <div classname="chart-div">
        <LineChart
          width={1100}
          height={470}
          data={data}
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date"/>
          <YAxis dataKey="value"/>
          <Tooltip />

      <Line
        type="monotone"
        dataKey="value"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
        </LineChart>
      </div>
    </div>
  );
};

export default ChartExercise;
