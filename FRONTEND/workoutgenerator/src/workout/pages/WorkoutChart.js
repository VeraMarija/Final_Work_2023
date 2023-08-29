import React,  { useContext, useEffect, useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
  } from "recharts";
import { port_string } from "../../config/global";
import { AuthContext } from "../../shared/context/authContext";
import './WorkoutChart.css';

export default function WorkoutChart() {

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [loadedExercises, setLoadedExercises] = useState();
  const auth = useContext(AuthContext);
  const myarray = [];
  const id = auth.userId

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(port_string + "workout/all",  {
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
        
        setLoadedExercises(responseData.workouts);
        console.log("loadedExercises", responseData.workouts);
        console.log("loaded", loadedExercises);
        
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);


  return (
    <div className="mychart">
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={loadedExercises}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="name" fill="#8884d8" />
        <Bar dataKey="createdAt" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
    </div>
  );
}