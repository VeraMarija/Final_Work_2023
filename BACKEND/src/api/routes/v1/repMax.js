const express = require('express');
const repMaxController = require('../../controllers/RepMaxController');
const { checkAuth, checkPermission } = require('../../middleware/auth');


const router = express.Router();

router.get(
    '/:exerciseId',
    checkAuth,
    repMaxController.getAllByExerciseId
);

module.exports = router;
