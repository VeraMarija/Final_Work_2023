const HttpError = require("../errors/httpError");
const CaloriesModel = require("../models/Calories");

module.exports.createCalories = async (req) => {
  const { userId, gender, age, weight, height, targetWeight, activity } =
    req.body;

  console.log("req.body----->", req.body);
  if (req.user != userId) {
    throw new HttpError("Forbidden, you do not have permission.", 403);
  }
  if (!gender) {
    throw new HttpError("Gender is required", 500);
  }
  let activityNumber;
  if (activity == "moderatelyActive") {
    activityNumber = 1.74;
  } else if (activity == "vigorouslyActive") {
    console.log('helooofsdf');
    activityNumber = 2.25;
    console.log('actiyiti', activityNumber);
  } else {
    activityNumber = 2.4;
  }
  let genderNumber;

  if(gender ==="female"){
    genderNumber = -161;
  }
  else{
    genderNumber= 5;
  }

  const BMRmaintain = Math.ceil(10 * weight + 6.25 * height - 5 * age + genderNumber);
  console.log(BMRmaintain);
  const TEE = Math.ceil(BMRmaintain * activityNumber);
  console.log(TEE);
  const BMRtarget = Math.ceil(10 * targetWeight + 6.25 * height - 5 * age + genderNumber);
  const TEEgoal = Math.ceil(BMRtarget * activityNumber);
  const calories = new CaloriesModel({
    user: userId,
    TEEmaintain: TEE,
    TEEtarget: TEEgoal,
  });
  try {
    await calories.save();
  } catch (err) {
    throw err;
  }

  return calories;
};

module.exports.getByUserId = async (req) => {
  if (req.user != req.params.userId){
    throw new HttpError("Forbidden, you do not have permission.", 403);
  }
    try {
      calories = await CaloriesModel.find({ user: req.params.userId });
      if (!calories || calories.length === 0) {
        throw new HttpError("No calories in database", 404);
      }
      return calories[0];
    } catch (err) {
      throw err;
    }
};
