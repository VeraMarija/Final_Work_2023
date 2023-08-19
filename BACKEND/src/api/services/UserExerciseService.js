const HttpError = require("../errors/httpError");
const UserExerciseModel = require("../models/UserExercise");
const { validationResult } = require("express-validator");

module.exports.getAll = async () => {
  try {
    const exercises = await UserExerciseModel.find();
    if (!exercises || exercises.length === 0) {
      throw new HttpError("No exercises found.", 404);
    }
    return exercises;
  } catch (err) {
    throw new HttpError("fetching exercises failed. Please try again.", 500);
  }
};

/**
 * Epley formula: Weight x (1 + (0.0333 x number of reps))
Example: 75 kg x (1 + (0.0333 x 6) = 90 kg or 198 pounds
  */
module.exports.createExercise = async (req) => {
  const { user, exercise, liftWeight, repetition } = req.body; //sam kreiraj repmax
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }
  const userExercise = new UserExerciseModel({
    user,
    exercise,
    liftWeight,
    repetition,
    repMax: Math.ceil(liftWeight * (1 + 0.0333 * repetition)),
  });

  try {
    await userExercise.save();
  } catch (err) {
    throw new HttpError("Saving exercise to database failed.", 500);
  }
  return userExercise;
};

module.exports.updateExercise = async (req) => {
  const { liftWeight, repetition } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }

  try {
    const userExercise = await UserExerciseModel.findById(
      req.params.exerciseId
    );
    if (!userExercise) {
      const error = new HttpError(
        "Updating exercise failed, exercise with that id doesnt exists.",
        404
      );
      throw error;
    }

    userExercise.liftWeight = liftWeight;
    userExercise.repetition = repetition;
    userExercise.repMax = Math.ceil(liftWeight * (1 + 0.0333 * repetition));

    try {
      await userExercise.save();
    } catch (err) {
      const error = new HttpError(
        "Something went wrong, could not update exercise.",
        500
      );
      throw error;
    }
    return userExercise;
  } catch (err) {
    throw err;
  }
};

module.exports.deleteExercise = async (exerciseId) => {
  try {
    const exercise = await UserExerciseModel.findById(exerciseId);
    if (!exercise) {
      throw new HttpError(
        "Deleting exercise failed, exercise with that id doesnt exists.",
        404
      );
    }
    await UserExerciseModel.findByIdAndRemove(exerciseId);
    return "Exercise deleted successfuly";
  } catch (err) {
    throw err;
  }
};

module.exports.getByExerciseId = async (exerciseId) => {
  try {
    const exercise = await UserExerciseModel.findById(exerciseId);
    if (!exercise) {
      throw new HttpError("Could not find exercise in database.", 404);
    }
    return exercise;
  } catch (err) {
    const error = new HttpError(
      "Fetching exercise failed, please try again later.",
      500
    );
    throw error;
  }
};
