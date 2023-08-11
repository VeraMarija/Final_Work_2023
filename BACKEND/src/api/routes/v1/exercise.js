const express = require('express');
const validate = require('express-validation');
const exerciseController = require('../../controllers/ExerciseController');
const { checkAuth, checkPermission } = require('../../middleware/auth');


const router = express.Router();

router.get(
    '/',
    (req, res, next) => checkPermission(req, res,next, 'admin'),
    exerciseController.getAll
);

router.post(
    '/',
    exerciseController.createExercise
);
module.exports = router;
