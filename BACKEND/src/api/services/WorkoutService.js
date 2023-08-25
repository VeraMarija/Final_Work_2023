const mongoose = require("mongoose");
const WorkoutModel = require("../models/Workout");
const UserExerciseModel = require("../models/UserExercise");
const HttpError = require("../errors/httpError");
const { validationResult } = require("express-validator");
const userExerciseService = require("../services/UserExerciseService");
const fs = require("fs");
const UserModel = require("../models/UserModel");
const { findById } = require("../models/ExerciseWeigh");
const ExerciseModel = require("../models/Exercise");
const { nextTick } = require("process");

module.exports.getAll = async () => {
  const workouts = await WorkoutModel.find();
  if (!workouts) {
    throw new Error("No workouts in database!");
  }
  return workouts;
};

const fixWeights = (weight) => {
  if (weight % 5 === 0) {
    return weight;
  } else {
    const difference = weight % 5;
    if (difference < 3) {
      return weight - difference;
    }
    return weight + (5 - difference);
  }
};

module.exports.createWorkout = async (req) => {
  const { name, user, userExercises } = req.body;
  if (user !== req.user) {
    throw new HttpError("Forbidden, you do not have permission.", 403);
  }
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }
  if (!userExercises || userExercises.length === 0) {
    throw new HttpError(
      "You did not choose any exercise in workout, can not create workout.",
      422
    );
  }
  let newUserExercises = await Promise.all(
    userExercises.map(async (exercise) => {
      const liftWeight = exercise.liftWeight;
      const repetition = exercise.repetition;
      const repMax = fixWeights(
        Math.ceil(liftWeight * (1 + 0.0333 * repetition))
      );
      const exerciseId = await ExerciseModel.find({
        name: exercise.exercise,
      }).exec();
      console.log(exerciseId);
      const userExercise = await new UserExerciseModel({
        user,
        exercise: exerciseId[0].id,
        liftWeight,
        repetition,
        repMax,
        firstSet: fixWeights(Math.ceil(0.65 * repMax)),
        secondSet: fixWeights(Math.ceil(0.75 * repMax)),
        thirdSet: fixWeights(Math.ceil(0.85 * repMax)),
      });
      try {
        console.log("userecerciseid", userExercise._id);
        await userExercise.save();
        return userExercise._id;
      } catch (err) {
        throw new HttpError("Can not save your exercise to database.", 500);
      }
    })
  );

  const workout = await new WorkoutModel({
    name,
    user,
    userExercises: newUserExercises,
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

module.exports.createWorkoutNext = async (req) => {
  console.log("evo");
  const userExercises = req.newUserExercises;
  const name = req.name;
  const workout = await new WorkoutModel({
    name,
    user: req.user,
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
    console.log("workout-----------------", workout);
    if (!workout) {
      throw new HttpError("Could not find workout in database.", 404);
    }
    if (workout.user.id !== req.user) {
      console.log("evo", workout.user._id);
      console.log("evo", req.user);
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
      .populate("user")
      .populate({
        path: "userExercises",
        select: "-user",
        populate: { path: "exercise", select: "name" },
      });
    workouts.forEach( w => console.log(w.userExercises));

    if (!workouts || workouts.length === 0) {
      return [];
    }
    return workouts;
  } catch (err) {
    throw err;
  }
};

