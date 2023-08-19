const mongoose = require("mongoose");
const WorkoutModel = require("../models/Workout");
const UserExerciseModel = require("../models/UserExercise");
const HttpError = require("../errors/httpError");
const { validationResult } = require("express-validator");
const userExerciseService = require("../services/UserExerciseService");
const fs = require("fs");
const UserModel = require("../models/UserModel");
const { findById } = require("../models/ExerciseWeigh");

module.exports.getAll = async () => {
  const workouts = await WorkoutModel.find();
  if (!workouts) {
    throw new Error("No workouts in database!");
  }
  return workouts;
};

module.exports.createWorkout = async (req) => {
  const { name, user, userExercises } = req.body;
  console.log("user", user);
  console.log("req.user", req.user);
  if (user !== req.user) {
    throw new HttpError("Forbidden, you do not have permission.", 403);
  }
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }

  const workout = await new WorkoutModel({
    name,
    user,
    userExercises,
  });

  try {
    await workout.save();
    const populatedWorkout = await WorkoutModel.findById(workout.id)
      .populate({
        path: "userExercises",
        select: "-user",
        populate: { path: "exercise", select: "name" },
      })
      .populate({ path: "user", select: "-password" });
    return populatedWorkout;
  } catch (err) {
    const error = new HttpError(
      "Creating workout failed, please try again later.",
      500
    );
    throw error;
  }
};

module.exports.updateWorkout = async (req) => {
  const { name, userExercises } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }
  try {
    const workout = await WorkoutModel.findById(req.params.workoutId);
    if (workout) {
      workout.name = name;
      workout.userExercises = userExercises;
      try {
        await workout.save();
      } catch (err) {
        const error = new HttpError(
          "Something went wrong, could not update workout.",
          500
        );
        throw error;
      }
    }
    return workout
      .populate({
        path: "userExercises",
        select: "-user",
        populate: { path: "exercise", select: "name" },
      })
      .populate("user");
  } catch (err) {
    const error = new HttpError(
      "Updating workout failed, workout with that id doesnt exists.",
      404
    );
    throw error;
  }
};

module.exports.deleteWorkout = async (workoutId) => {
  try {
    const workout = await WorkoutModel.findById(workoutId);
    if (!workout) {
      throw new HttpError(
        "Deleting workout failed, workout with that id doesnt exists.",
        404
      );
    }
    const userExercises = workout.userExercises;
    for (var id of userExercises) {
      await UserExerciseModel.findByIdAndRemove(id);
    }
    await WorkoutModel.findByIdAndRemove(userId);
    return "Workout deleted successfuly";
  } catch (err) {
    throw err;
  }
};

module.exports.getByWorkoutId = async (req) => {
  try {
    const workout = await WorkoutModel.findById(req.params.workoutId)
      .populate({
        path: "userExercises",
        select: "-user",
        populate: { path: "exercise", select: "name" },
      })
      .populate("user");
      console.log('workout-----------------', workout);
    if (!workout) {
      throw new HttpError("Could not find workout in database.", 404);
    }
    if (workout.user.id !== req.user) {
      console.log('evo', workout.user._id);
      console.log('evo', req.user);
      throw new HttpError("Forbidden, you do not have permission.", 403);
    }
    return workout;
  } catch (err) {
    const error = new HttpError(
      "Fetching workout failed, please try again later.",
      500
    );
    throw error;
  }
};

module.exports.getallByUserId = async (userId) => {
  try {
    console.log("evo me");
    const workouts = await WorkoutModel.find({ user: userId })
      .populate({
        path: "userExercises",
        populate: { path: "exercise" },
      })
      .populate("user");
    console.log(workouts);
    if (!workouts || workouts.length === 0) {
      return [];
    }
    return workouts;
  } catch (err) {
    throw err;
  }
};
