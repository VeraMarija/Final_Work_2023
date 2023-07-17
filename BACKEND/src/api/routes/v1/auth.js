const express = require("express");
const {validate} = require("express-validation");
const authController = require("../../controllers/AuthController");
const {
  login,
  register,
  refresh,
  sendPasswordReset,
  passwordReset,
} = require("../../validation/authValidation");

const router = express.Router();

router.post(
    "/register",
    validate(register),
    authController.register
);

router.post(
    "/login",
    validate(login),
    authController.login
);

module.exports = router;
