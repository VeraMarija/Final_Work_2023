const caloriesService = require("../services/CaloriesService");



module.exports.createCalories = async (req, res, next) => {
  try {
    const result = await caloriesService.createCalories(req);
    return res.status(200).json({ calories: result });
  } catch (error) {
    return next(error);
  }
};

module.exports.getByUserId = async (req, res, next) => {
    try {
      const result = await caloriesService.getByUserId(req);
      return res.status(200).json({ calories: result });
    } catch (error) {
      return next(error);
    }
  };
  

  module.exports.updateCalories = async (req, res, next) => {
    try {
      const result = await caloriesService.updateCalories(req);
      return res.status(200).json({ calories: result });
    } catch (error) {
      return next(error);
    }
  };

  module.exports.deleteCalories = async (req, res, next) => {
    try {
      const result = await caloriesService.deleteCalories(req);
      return res.json({message: result});
    } catch (error) {
      return next(error);
    }
  };