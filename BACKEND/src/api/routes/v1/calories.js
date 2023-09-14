const express = require('express');
const caloriesController = require('../../controllers/CaloriesController');
const { checkAuth, checkPermission } = require('../../middleware/auth');


const router = express.Router();

router.get("/:userId", checkAuth, caloriesController.getByUserId);

router.post(
    '/',
    checkAuth,
    caloriesController.createCalories
);


router.put(
    '/:caloriesId',
    checkAuth,
    caloriesController.updateCalories
);

router.delete(
    '/:caloriesId',
    checkAuth,
    caloriesController.deleteCalories
);


module.exports = router;