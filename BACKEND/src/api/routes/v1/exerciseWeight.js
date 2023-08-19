const express = require('express');
const validate = require('express-validation');
const exerciseWeightController = require('../../controllers/ExerciseWeightController');
const { checkAuth, checkPermission } = require('../../middleware/auth');


const router = express.Router();


router.post(
    '/',
    checkAuth,
    checkPermission,
    exerciseWeightController.createExerciseWeight
);

router.put(
    '/:weightId',
    checkAuth,
    checkPermission,
    exerciseWeightController.updateExerciseWeight
);

router.delete(
    '/:weightId',
    checkAuth,
    checkPermission,
    exerciseWeightController.deleteExerciseWeight
);

router.get("/:weightId", checkAuth, checkPermission, exerciseWeightController.getByExerciseWeightId);


module.exports = router;
