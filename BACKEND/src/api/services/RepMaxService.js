const HttpError = require("../errors/httpError");
const RepMaxModel = require("../models/RepMax");
const UserExerciseModel = require("../models/UserExercise");

module.exports.getAllByExerciseId = async (req) => {
    console.log('usa ');
  try {
    const repMaxes = await RepMaxModel.find({userExercise: req.params.exerciseId}).populate("userExercise");
    if (!repMaxes || repMaxes.length === 0) {
      throw new HttpError("No repMay found.", 404);
    }
    console.log(repMaxes);
    return repMaxes;
  } catch (err) {
    throw new HttpError("fetching exercises failed. Please try again.", 500);
  }
};