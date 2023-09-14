const express = require('express');
const validate = require('express-validation');
const exerciseController = require('../../controllers/ExerciseController');
const { checkAuth, checkPermission } = require('../../middleware/auth');
const {upload} = require('../../middleware/multer');

const router = express.Router();

router.get(
    '/all',
    checkAuth,
    exerciseController.getAll
);

router.post(
    '/',
    checkAuth,
    checkPermission,
    upload.single("picture"),
    exerciseController.createExercise
);

router.put(
    '/:exerciseId',
    checkAuth,
    checkPermission,
    upload.single("picture"),
    exerciseController.updateExercise
);

router.delete(
    '/:exerciseId',
    checkAuth,
    checkPermission,
    exerciseController.deleteExercise
);

router.get("/:exerciseId", checkAuth, exerciseController.getByExerciseId);


module.exports = router;
