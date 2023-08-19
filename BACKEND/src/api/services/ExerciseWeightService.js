const HttpError = require("../errors/httpError");
const Exercise = require("../models/Exercise");
const ExerciseModel = require("../models/Exercise");
const ExerciseWeightModel = require("../models/ExerciseWeigh");
const UserExerciseModel = require("../models/UserExercise");

module.exports.createExerciseWeight = async (req) => {
  const { userExercise } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }

  try {
    const exercise = await UserExerciseModel.findById(userExercise);
    const repMax = exercise.repMax;
    if (!exercise) {
      throw new HttpError("Could not find exercise in database.", 404);
    }
    const weight = new ExerciseModel({
      userExercise,
      firstSet: 0.85 * repMax,
      secondSet: 0.75 * repMax,
      thirdSet: 0.65 * repMax,
    });

    try {
      weight.save();
    } catch (err) {
      throw new HttpError("Saving weights to database failed.", 500);
    }
    return weight;
  } catch (error) {
    throw error;
  }
};


module.exports.deleteExerciseWeigh = async (weightId) => {
  try {
    const weight = await ExerciseWeightModel.findById(weightId);
    if (!weight) {
      throw new HttpError(
        "Deleting weight failed, weight with that id doesnt exists.",
        404
      );
    }
    await ExerciseWeightModel.findByIdAndRemove(weightId);

    return "Weight deleted successfuly";
  } catch (err) {
    throw err;
  }
};

module.exports.getByExerciseWeighId = async (weightId) => {

  try {
    const weight = await ExerciseWeightModel.findById(weightId);
    if (!weight) {
      throw new HttpError("Could not find weight in database.", 404);
    }
    return weight;
  } catch (err) {
    const error = new HttpError(
      "Fetching weight failed, please try again later.",
      500
    );
    throw error;
  }
};
