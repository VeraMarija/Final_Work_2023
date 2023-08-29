const express = require("express");
const validate = require("express-validation");
const userExerciseController = require("../../controllers/UserExerciseController");
const { checkAuth, checkPermission } = require("../../middleware/auth");


const router = express.Router();

router.get("/all", checkAuth, userExerciseController.getAll);

router.post(
  "/",
  checkAuth,
  userExerciseController.createExercise
);

router.put(
  "/:exerciseId",
  checkAuth,
  checkPermission,
  userExerciseController.updateExercise
);

router.delete(
  "/:exerciseId",
  checkAuth,
  checkPermission,
  userExerciseController.deleteExercise
);

router.get("/:exerciseId", checkAuth, checkPermission, userExerciseController.getByExerciseId);

router.get("/upgrade/:userExerciseId", checkAuth, userExerciseController.upgrade1RM);

module.exports = router;
