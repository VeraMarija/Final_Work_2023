const workoutService = require("../services/WorkoutService");

module.exports.getAll = async (req, res, next) => {
  try {
    const result = await workoutService.getAll();
    return res.status(200).json({ workouts: result });
  } catch (error) {
    return next(error);
  }
};

module.exports.createWorkout = async (req, res, next) => {
  try {
    const result = await workoutService.createWorkout(req);
    return res.status(200).json({ createdWorkout: result });
  } catch (error) {
    return next(error);
  }
};

module.exports.createWorkoutNext = async (req, res, next) => {
  console.log("usa unutra");
  try {
    const result = await workoutService.createWorkoutNext(req);
    return res.status(200).json({ createdWorkout: result });
  } catch (error) {
    return next(error);
  }
};

module.exports.updateWorkout = async (req, res, next) => {
  try {
    const result = await workoutService.updateWorkout(req);
    return res.status(200).json({ updatedWorkout: result });
  } catch (error) {
    return next(error);
  }
};

module.exports.deleteWorkout = async (req, res, next) => {
  try {
    const result = await workoutService.deleteWorkout(req.params.workoutId);
    return res.status(200).json({ message: result });
  } catch (error) {
    return next(error);
  }
};

module.exports.getByWorkoutId = async (req, res, next) => {
  try {
    const result = await workoutService.getByWorkoutId(req);
    return res.status(200).json({ loadedWorkout: result });
  } catch (error) {
    return next(error);
  }
};

module.exports.getallByUserId = async (req, res, next) => {
  try {
    const result = await workoutService.getallByUserId(req.params.userId);
    return res.status(200).json({ workouts: result });
  } catch (error) {
    return next(error);
  }
};
