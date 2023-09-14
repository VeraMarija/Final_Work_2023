const HttpError = require("../errors/httpError");
const Exercise = require("../models/Exercise");
const ExerciseModel = require("../models/Exercise");
const UserExerciseModel = require("../models/UserExercise");

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
  const exerciseNameExists = await ExerciseModel.find({name: name});
  if(exerciseNameExists.length !== 0){
    throw new HttpError("Choose another name, exercise with that name already exists, name must be unique", 403);
  }
  const exercise = new ExerciseModel({
    name,
    instructions,
    equipment,
    ...( req.file && { picture : req.file.filename}),
  });

  try {
    await exercise.save();
  } catch (err) {
    throw err;
  }

  return exercise;
};

module.exports.updateExercise = async (req) => {
  console.log("helooo");
  const { instructions, equipment } = req.body;
  let exercise;

  try {
    exercise = await ExerciseModel.findById(req.params.exerciseId);
    if (exercise) {
      exercise.instructions = instructions;
      exercise.equipment = equipment;
      if (req.file) exercise.picture = req.file.filename;
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
    throw err;
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
    const userExercise = await UserExerciseModel.find({ exercise: exerciseId });
    if (userExercise && userExercise.length !==0 )  {
      throw new HttpError(
        "Forbidden, can not delete exercise while users are using it for workouts",
        403
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
  console.log("evo ga");
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
