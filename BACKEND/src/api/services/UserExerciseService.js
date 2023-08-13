const UserModel = require("../models/UserModel");
const UserExerciseModel = require("../models/UserExercise");
const HttpError = require("../errors/httpError");

module.exports.getUserExerciseByUserId = async (userId) => {
  try {
    const userExercises = await UserExerciseModel.find({
      user: userId,
    }).populate(user);
  } catch (err) {
    const error = new HttpError(
      "Fetching user exercises failed, please try again later.",
      500
    );
    throw error;
  }

  if (!userExercises || userExercises.length === 0) {
    throw new HttpError(
      "Could not find exercises for the provided user id.",
      404
    );
  }
  return userExercises;
};


