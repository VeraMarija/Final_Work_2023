const ExerciseModel = require("../models/Exercise");

module.exports.getAll = async () => {
  const exercises = await ExerciseModel.find();
  if (exercises.length === 0) {
    throw new Error("No exercises in database!");
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
    console.log(err);

    return { error: err.message };
  }

  return exercise;
};
