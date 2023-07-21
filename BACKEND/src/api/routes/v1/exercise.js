const express = require('express');
const validate = require('express-validation');
const exerciseController = require('../../controllers/ExerciseController');
const { authorize } = require('../../middleware/auth');


const router = express.Router();

router.get(
    '/',
    authorize('admin'),
    exerciseController.getAll
);

router.post(
    '/',
    exerciseController.createExercise
);
module.exports = router;
