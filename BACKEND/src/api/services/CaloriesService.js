const HttpError = require("../errors/httpError");
const CaloriesModel = require("../models/Calories");

module.exports.createCalories = async (req) => {
  const { userId, gender, age, weight, height, targetWeight, activity } =
    req.body;
  if (req.user != userId) {
    throw new HttpError("Forbidden, you do not have permission.", 403);
  }
  const genderNumber = gender === "female" ? -161 : 5;
  const BMRmaintain = 10 * weight + 6.25 * height - 5 * age + genderNumber;
  const TEEmaintain = BMRmaintain * activity;
  const BMRtarget = 10 * targetWeight + 6.25 * height - 5 * age + genderNumber;
  const TEEtarget = BMRtarget * activity;
  const calories = new CaloriesModel({
    user: userId, 
    TEEmaintain: TEEmaintain,
    TEEtarget: TEEtarget
  });
  try {
    await calories.save();
  } catch (err) {
    throw err;
  }

  return exercise;
};


module.exports.getByUSerId = async (req) => {
    if(req.user != req.params.userId)
    try {
      calories = await CaloriesModel.find({user: req.params.userId});
      if(!calories || calories.length === 0){
        throw new HttpError('No calories in database', 404);
      }
      return calories[0];
    } catch (err) {
      throw err;
    }
  };
  