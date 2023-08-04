import React from "react";
import { useParams } from "react-router-dom";
import UserExerciseList from "../components/UserExerciseList";

const DUMMY_USER_EXERCISES = [
  {
    id: "ue1",
    user: "u1",
    name: "Bench Press",
    liftWeight: 100,
    repetition: 5,
  },
  {
    id: "ue2",
    user: "u1",
    name: "Deadlift",
    liftWeight: 150,
    repetition: 4,
  },
  {
    id: "ue2",
    user: "u3",
    name: "Deadlift",
    liftWeight: 150,
    repetition: 4,
  },
];

const UserExercises = () => {
  const {userId} = useParams();
  const loadedUserExercises = DUMMY_USER_EXERCISES.filter(
    userExercise => userExercise.user === userId
  );
  return <UserExerciseList items={loadedUserExercises} />;
};

export default UserExercises;
