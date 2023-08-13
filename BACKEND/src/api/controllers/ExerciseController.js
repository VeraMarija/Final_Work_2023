const exerciseService = require("../services/ExerciseService");

module.exports.getAll = async (req, res, next) => {
  try {
    const result = await exerciseService.getAll();
    return res.status(200).json({exercises: result});
  } catch (error) {
    return next(error);
  }
};

module.exports.createExercise = async (req, res, next) => {
  try {
    const result = await exerciseService.createExercise(req);
    return res.status(200).json({ exercise: result });
  } catch (error) {
    return next(error);
  }
};


module.exports.updateExercise = async (req, res, next) => {
  try {
    const result = await exerciseService.updateExercise(req);
    return res.json({exercise: result});
  } catch (error) {
    return next(error);
  }
};


module.exports.deleteExercise = async (req, res, next) => {
  try {
    const result = await exerciseService.deleteExercise(req.params.exerciseId);
    return res.json({message: result});
  } catch (error) {
    return next(error);
  }
};