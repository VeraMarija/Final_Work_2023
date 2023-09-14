const HttpError = require("../errors/httpError");
const CaloriesModel = require("../models/Calories");

module.exports.createCalories = async (req) => {
  const { userId, gender, age, weight, height, targetWeight, weeks, activity } =
    req.body;

  console.log("req.body----->", req.body);
  if (req.user != userId) {
    throw new HttpError("Forbidden, you do not have permission.", 403);
  }
  if (!gender) {
    throw new HttpError("Gender is required", 500);
  }
  let numberTargetWeight = parseInt(targetWeight);
  let numberWeight = parseInt(weight);
  if (numberTargetWeight >= numberWeight) {
    throw new HttpError(
      "This calculator is only for loosing weight, please enter smaller value for your target weigh, than your current weight",
      403
    );
  }
  let activityNumber;
  if (activity == "moderatelyActive") {
    activityNumber = 1.74;
  } else if (activity == "vigorouslyActive") {
    activityNumber = 2.25;
    console.log("actiyiti", activityNumber);
  } else {
    activityNumber = 2.4;
  }
  let genderNumber;

  if (gender === "female") {
    genderNumber = -161;
  } else {
    genderNumber = 5;
  }

  const BMRmaintain = Math.ceil(
    10 * numberWeight + 6.25 * height - 5 * age + (gender === "female" ? -161 : 5)
  );
  console.log(BMRmaintain);
  const TEE = Math.ceil(BMRmaintain * activityNumber);
  console.log(TEE);
  const BMRtarget = Math.ceil(
    10 * numberTargetWeight +
      6.25 * height -
      5 * age +
      (gender === "female" ? -161 : 5)
  );
  const TEEgoal = Math.ceil(BMRtarget * activityNumber);
  const calorieDeficit = Math.ceil(
    ((numberWeight - numberTargetWeight) * 1000 * 9) / (weeks * 7)
  );
  const calories = new CaloriesModel({
    user: userId,
    TEEmaintain: TEE,
    TEEtarget: TEEgoal,
    weeks: weeks,
    calorieDeficit: calorieDeficit,
    currentWeight: numberWeight,
    targetWeight: numberTargetWeight,
    gender: gender,
    age: age,
    activity: activity,
    height: height,
  });
  try {
    await calories.save();
  } catch (err) {
    throw err;
  }

  return calories;
};

module.exports.getByUserId = async (req) => {
  if (req.user != req.params.userId) {
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

module.exports.updateCalories = async (req) => {
  const {
    userId,
    gender,
    age,
    currentWeight,
    height,
    targetWeight,
    weeks,
    activity,
  } = req.body;
  
  const caloriesId = req.params.caloriesId;
  const calories = await CaloriesModel.findById(caloriesId);
  if (req.user != userId) {
    throw new HttpError("Forbidden, you do not have permission.", 403);
  }
  if (!gender) {
    throw new HttpError("Gender is required", 500);
  }
  let numberTargetWeight = parseInt(targetWeight);
  let numberCurrentWeight = parseInt(currentWeight);
  if (numberTargetWeight >= numberCurrentWeight) {
  
    throw new HttpError(
      "This calculator is only for loosing weight, please enter smaller value for your target weigh, than your current weight",
      403
    );
  }

  let activityNumber;
  if (activity == "moderatelyActive") {
    activityNumber = 1.74;
  } else if (activity == "vigorouslyActive") {
    activityNumber = 2.25;
    console.log("actiyiti", activityNumber);
  } else {
    activityNumber = 2.4;
  }
  let genderNumber;

  if (gender === "female") {
    genderNumber = -161;
  } else {
    genderNumber = 5;
  }
  console.log("gender", genderNumber);
  const BMRmaintain = Math.ceil(
    10 * numberCurrentWeight +
      6.25 * height -
      5 * age +
      (gender === "female" ? -161 : 5)
  );
  console.log(BMRmaintain);
  const TEE = Math.ceil(BMRmaintain * activityNumber);
  console.log(TEE);
  const BMRtarget = Math.ceil(
    10 * numberTargetWeight +
      6.25 * height -
      5 * age +
      (gender === "female" ? -161 : 5)
  );
  const TEEgoal = Math.ceil(BMRtarget * activityNumber);
  const calorieDeficit = Math.ceil(
    ((numberCurrentWeight - numberTargetWeight) * 1000 * 9) / (weeks * 7)
  );
  calories.user = userId;
  calories.TEEmaintain = TEE;
  calories.TEEtarget = TEEgoal;
  calories.weeks = weeks;
  calories.calorieDeficit = calorieDeficit;
  calories.currentWeight = numberCurrentWeight;
  calories.targetWeight = numberTargetWeight;
  calories.age = age;
  calories.activity = activity;
  calories.height = height;

  try {
    await calories.save();
  } catch (err) {
    throw err;
  }

  return calories;
};

module.exports.deleteCalories = async (req) => {
  try {
    const calories = await CaloriesModel.findById(req.params.caloriesId);

    if (!calories) {
      throw new HttpError(
        "Deleting calories failed, calories with that id doesnt exists.",
        404
      );
    }
    console.log(req.user);
    console.log(calories.user);
    if (req.user != calories.user) {
      throw new HttpError("Forbidden, you do not have permission.", 403);
    }
    await CaloriesModel.findByIdAndRemove(req.params.caloriesId);

    return "Exercise deleted successfuly";
  } catch (err) {
    throw err;
  }
};
