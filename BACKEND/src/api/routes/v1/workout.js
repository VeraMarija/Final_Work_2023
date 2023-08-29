const express = require("express");
const validate = require("express-validation");
const workoutController = require("../../controllers//WorkoutController");
const { checkAuth, checkPermission } = require("../../middleware/auth");


const router = express.Router();

router.get("/all", checkAuth, workoutController.getAll);

router.post(
  "/",
  checkAuth,
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
  workoutController.deleteWorkout
);

router.get("/allByUserId/:userId", checkAuth, checkPermission, workoutController.getallByUserId);

router.get("/:workoutId", checkAuth, workoutController.getByWorkoutId);

router.put("/addExercise/:workoutId", checkAuth, workoutController.addExerciseToWorkout);

module.exports = router;
