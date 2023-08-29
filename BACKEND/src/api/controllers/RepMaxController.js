const repMaxService = require("../services/RepMaxService");

module.exports.getAllByExerciseId = async (req, res, next) => {
  try {
    console.log('evo ga');
    const result = await repMaxService.getAllByExerciseId(req);
    return res.status(200).json({repMax: result});
  } catch (error) {
    return next(error);
  }
};
