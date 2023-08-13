const express = require('express');
const validate = require('express-validation');
const userController = require('../../controllers/UserController');
const { checkAuth, checkPermission } = require('../../middleware/auth');


const router = express.Router();



router.get(
    '/all',
    checkAuth,
    checkPermission,
    userController.getAll
);

router.post(
    '/',
    checkAuth,
    checkPermission,
    userController.createUser
);

router.put(
    '/:userId',
    checkAuth,
    checkPermission,
    userController.updateUser
);

router.delete(
    '/:userId',
    checkAuth,
    checkPermission,
    userController.deleteUser
);


router.get(
    '/:userId',
    checkAuth,
    checkPermission,
    userController.getByUserId
);


module.exports = router;
