const HttpError = require("../errors/httpError");
const UserExerciseModel = require("../models/UserExercise");
const { validationResult } = require("express-validator");

module.exports.getAll = async () => {
  try {
    const exercises = await UserExerciseModel.find().populate({path:'exercise' , select: 'name'});
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

const fixWeights = (weight) =>{
  if(weight%5 === 0){
    return weight;
  }
  else{
    const difference = weight%5 ;
    if(difference < 3){
      return weight - difference;
    }
    return weight + (5-difference);
  }
}

module.exports.createExercise = async (req) => {

  const { user, exercise, liftWeight, repetition } = req.body; //sam kreiraj repmax
  if (user !== req.user) {
    throw new HttpError("Forbidden, you do not have permission.", 403);
  }
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }
  const repMax =  fixWeights(Math.ceil(liftWeight * (1 + 0.0333 * repetition)));
  const userExercise = new UserExerciseModel({
    user,
    exercise,
    liftWeight,
    repetition,
    repMax,
    firstSet: fixWeights(Math.ceil(0.65 * repMax)),
    secondSet: fixWeights(Math.ceil(0.75 * repMax)),
    thirdSet: fixWeights(Math.ceil(0.85 * repMax)),
  });

  try {
    await userExercise.save();
  } catch (err) {
    throw new HttpError("Saving exercise to database failed.", 500);
  }
  return userExercise.populate({path:'exercise' , select: 'name'});
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
    userExercise.repMax = fixWeights(Math.ceil(liftWeight * (1 + 0.0333 * repetition)));
    userExercise.firstSet= fixWeights(Math.ceil(0.65 * repMax));
    userExercise.secondSet= fixWeights(Math.ceil(0.75 * repMax));
    userExercise.thirdSet= fixWeights(Math.ceil(0.85 * repMax));

    try {
      await userExercise.save();
    } catch (err) {
      const error = new HttpError(
        "Something went wrong, could not update exercise.",
        500
      );
      throw error;
    }
    return userExercise.populate({path:'exercise' , select: 'name'});;
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
    return exercise.populate({path:'exercise' , select: 'name'});;
  } catch (err) {
    const error = new HttpError(
      "Fetching exercise failed, please try again later.",
      500
    );
    throw error;
  }
};
