const express = require('express');
const validate = require('express-validation');
const exerciseController = require('../../controllers/ExerciseController');
const { authorize, ADMIN, LOGGED_USER } = require('../../middleware/auth');


const router = express.Router();

router.get(
    '/',
    exerciseController.getAll
);

router.post(
    '/',
    exerciseController.createExercise
);
module.exports = router;
