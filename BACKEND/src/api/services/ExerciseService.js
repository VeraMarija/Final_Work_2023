const HttpError = require("../errors/httpError");
const ExerciseModel = require("../models/Exercise");

module.exports.getAll = async () => {
  try {
    const exercises = await ExerciseModel.find();
  } catch (err) {
    throw new HttpError("fetching exercises failed. Please try again.", 500);
  }

  if (!exercises || exercises.length === 0) {
    throw new HttpError("No exercises found.", 404);
  }
  return exercises;
};

module.exports.createExercise = async (req) => {
  const { name, instructions, equipment } = req.body;

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
  const { name, instructions, equipment} = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }
  try {
    const exercise = await ExerciseModel.findById(req.params.exerciseId);
  } catch (err) {
    const error = new HttpError(
      "Updating exercise failed, exercise with that id doesnt exists.",
      404
    );
    throw error;
  }

  if (exercise) {
    user.name = name;
    user.instructions = instructions;
    user.equipment = equipment;
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
};

module.exports.deleteExercise = async (exerciseId) => {
  try {
    const exercise = await ExerciseModel.findById(exerciseId);
  } catch (err) {
    const error = new HttpError(
      "Updating exercise failed, exercise with that id doesnt exists.",
      404
    );
    throw error;
  }
  try {
    await ExerciseModel.deleteOne({ id: exerciseId });
  } catch (error) {
    throw new HttpError("deleting exercise failed. Please try again", 500);
  }
  return "Exercise deleted successfuly";
};

