const exerciseService = require("../services/ExerciseService");

module.exports.getAll = async (req, res, next) => {
  try {
    const result = await exerciseService.getAll();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports.createExercise = async (req, res, next) => {
  try {
    const result = await exerciseService.createExercise(req);
    res.json({ exercise: result });
  } catch (error) {
    next(error);
  }
};
