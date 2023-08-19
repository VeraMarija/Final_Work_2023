const mongoose = require("mongoose");
const WorkoutModel = require("../models/Workout");
const UserExerciseModel = require("../models/UserExercise");
const HttpError = require("../errors/httpError");
const { validationResult } = require("express-validator");
const userExerciseService = require("../services/UserExerciseService");
const fs = require("fs");

module.exports.getAll = async () => {
  const workouts = await WorkoutModel.find();
  if (!workouts) {
    throw new Error("No workouts in database!");
  }
  return workouts;
};

module.exports.createWorkout = async (req) => {
  const { userExercises } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }

  const workout = await new WorkoutModel({
    userExercises,
  });
  try {
    await workout.save();
  } catch (err) {
    const error = new HttpError(
      "Creating workout failed, please try again later.",
      500
    );
    throw error;
  }
  return workout;
};

module.exports.updateWorkout = async (req) => {
  const { userExercises } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }
  try {
    const workout = await WorkoutModel.findById(req.params.workoutId);
    if (workout) {
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
    return workout;
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

module.exports.getByWorkoutId = async (workoutId) => {
  let user;
  try {
    const workout = await WorkoutModel.findById(workoutId);
    if (!workout) {
      throw new HttpError("Could not find workout in database.", 404);
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
