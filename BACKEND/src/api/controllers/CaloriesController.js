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
  