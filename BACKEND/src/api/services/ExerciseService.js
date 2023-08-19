const HttpError = require("../errors/httpError");
const Exercise = require("../models/Exercise");
const ExerciseModel = require("../models/Exercise");

module.exports.getAll = async () => {
  try {
    const exercises = await ExerciseModel.find();
    /*if (!exercises || exercises.length === 0) {
      throw new HttpError("No exercises found.", 404);
    }*/
    console.log(exercises);
    return exercises;
  } catch (err) {
    throw new HttpError("fetching exercises failed. Please try again.", 500);
  }
};

module.exports.createExercise = async (req) => {
  const { name, instructions, equipment } = req.body;
  console.log("------req", req);
  const exercise = new ExerciseModel({
    name,
    instructions,
    equipment,
  });

  try {
    await exercise.save();
  } catch (err) {
    throw new HttpError("Saving exercise to database failed.", 500);
  }

  return exercise;
};

module.exports.updateExercise = async (req) => {
  console.log("helooo");
  const { name, instructions, equipment } = req.body;
  let exercise;
  try {
    exercise = await ExerciseModel.findById(req.params.exerciseId);
    if (exercise) {
      exercise.name = name;
      exercise.instructions = instructions;
      exercise.equipment = equipment;
      try {
        await exercise.save();
      } catch (err) {
        const error = new HttpError(
          "Something went wrong, could not update exercise.",
          500
        );
        throw error;
      }
    }
    return exercise;
  } catch (err) {
    const error = new HttpError(
      "Updating exercise failed, exercise with that id doesnt exists.",
      404
    );
    throw error;
  }
};

module.exports.deleteExercise = async (exerciseId) => {
  try {
    const exercise = await ExerciseModel.findById(exerciseId);
    if (!exercise) {
      throw new HttpError(
        "Deleting exercise failed, exercise with that id doesnt exists.",
        404
      );
    }
    await ExerciseModel.findByIdAndRemove(exerciseId);

    return "Exercise deleted successfuly";
  } catch (err) {
    throw err;
  }
};

module.exports.getByExerciseId = async (exerciseId) => {
  let exercise;
  console.log('evo ga');
  try {
    exercise = await ExerciseModel.findById(exerciseId);
  } catch (err) {
    const error = new HttpError(
      "Fetching exercise failed, please try again later.",
      500
    );
    throw error;
  }

  if (!exercise || exercise.length === 0) {
    throw new HttpError("Could not find exercise in database.", 404);
  }
  return exercise;
};
