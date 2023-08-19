const exerciseWeightService = require("../services/ExerciseWeightService");


module.exports.createExerciseWeight = async (req, res, next) => {
  try {
    const result = await exerciseWeightService.createExerciseWeight(req);
    return res.status(200).json({ weight: result });
  } catch (error) {
    return next(error);
  }
};


module.exports.updateExerciseWeight = async (req, res, next) => {
  try {
    const result = await exerciseWeightService.updateExerciseWeight(req);
    return res.json({weight: result});
  } catch (error) {
    return next(error);
  }
};


module.exports.deleteExerciseWeight = async (req, res, next) => {
  try {
    const result = await exerciseWeightService.deleteExerciseWeight(req.params.weightId);
    return res.json({message: result});
  } catch (error) {
    return next(error);
  }
};

module.exports.getByExerciseWeightId = async (req, res, next) => {
  try {
    const result = await exerciseWeightService.deleteExerciseWeight(req.params.weightId);
    return res.status(200).json({ loadedWeight: result });
  } catch (error) {
    return next(error);
  }
};
