const express = require('express');
const validate = require('express-validation');
const exerciseController = require('../../controllers/ExerciseController');
const { checkAuth, checkPermission } = require('../../middleware/auth');


const router = express.Router();

router.get(
    '/all',
    checkAuth,
    checkPermission,
    exerciseController.getAll
);

router.post(
    '/',
    checkAuth,
    checkPermission,
    exerciseController.createExercise
);

router.put(
    '/:exerciseId',
    checkAuth,
    checkPermission,
    exerciseController.updateExercise
);

router.delete(
    '/:exerciseId',
    checkAuth,
    checkPermission,
    exerciseController.deleteExercise
);


module.exports = router;
