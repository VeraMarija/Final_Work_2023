const express = require("express");
const validate = require("express-validation");
const workoutController = require("../../controllers//WorkoutController");
const { checkAuth, checkPermission } = require("../../middleware/auth");


const router = express.Router();

router.get("/all", checkAuth, checkPermission, workoutController.getAll);

router.post(
  "/",
  checkAuth,
  checkPermission,
  workoutController.createWorkout
);

router.put(
  "/:workoutId",
  checkAuth,
  checkPermission,
  workoutController.updateWorkout
);

router.delete(
  "/:workoutId",
  checkAuth,
  checkPermission,
  workoutController.deleteWorkout
);

router.get("/:workoutId", checkAuth, checkPermission, workoutController.getByWorkoutId);

module.exports = router;
