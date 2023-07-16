const express = require('express');
const validate = require('express-validation');
const userController = require('../../controllers/UserController');
const { authorize, ADMIN, LOGGED_USER } = require('../../middleware/auth');


const router = express.Router();

router.post(
    '/',
    userController.createUser
);
module.exports = router;
