const userExerciseService = require("../services/UserExerciseService");

module.exports.getAll = async (req, res, next) => {
  try {
    const result = await userExerciseService.getAll();
    console.log('exercises', result);
    return res.status(200).json({exercises: result});
  } catch (error) {
    return next(error);
  }
};

module.exports.createExercise = async (req, res, next) => {
  try {
    const result = await userExerciseService.createExercise(req);
    return res.status(200).json({ exercise: result });
  } catch (error) {
    return next(error);
  }
};


module.exports.updateExercise = async (req, res, next) => {
  try {
    const result = await userExerciseService.updateExercise(req);
    return res.json({exercise: result});
  } catch (error) {
    return next(error);
  }
};


module.exports.deleteExercise = async (req, res, next) => {
  try {
    const result = await userExerciseService.deleteExercise(req.params.exerciseId);
    return res.json({message: result});
  } catch (error) {
    return next(error);
  }
};

module.exports.getByExerciseId = async (req, res, next) => {
  try {
    const result = await userExerciseService.getByExerciseId(req.params.exerciseId);
    return res.status(200).json({ loadedExercise: result });
  } catch (error) {
    return next(error);
  }
};


module.exports.upgrade1RM = async (req, res, next) => {
  try {
    const result = await userExerciseService.upgrade1RM(req);
    return res.status(200).json({ loadedExercise: result });
  } catch (error) {
    return next(error);
  }
};


module.exports.reduce1RM = async (req, res, next) => {
  try {
    const result = await userExerciseService.reduce1RM(req);
    return res.status(200).json({ loadedExercise: result });
  } catch (error) {
    return next(error);
  }
};

