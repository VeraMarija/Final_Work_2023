const mongoose = require('mongoose');
const UserModel = require("../models/UserModel");
const UserExerciseModel = require("../models/UserExercise");
const HttpError = require("../errors/httpError");
const { validationResult } = require("express-validator");
const userExerciseService = require("../services/UserExerciseService");

module.exports.getAll = async () => {
  const users = await UserModel.find();
  if (!users) {
    throw new Error("No users in database!");
  }
  console.log("users---------", users);
  return users;
};

module.exports.createUser = async (req) => {
  const { email, password, firstName, lastName } = req.body;
  let existingUser;
  try {
    existingUser = await UserModel.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    throw error;
  }

  if (existingUser) {
    const error = new HttpError(
      "User with that email exists already, please try with another email address or login instead.",
      422
    );
    throw error;
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }

  const user = new UserModel({
    email,
    password,
    firstName,
    lastName,
  });

  try {
    await user.save();
  } catch (err) {
    const error = new HttpError(
      "Creating user failed, please try again later.",
      500
    );
    throw error;
  }

  return user;
};

module.exports.updateUser = async (req) => {
  const { firstName, lastName, email, role } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }
  try {
    const user = await UserModel.findById(req.params.userId);
  } catch (err) {
    const error = new HttpError(
      "Updating user failed, user with that id doesnt exists.",
      404
    );
    throw error;
  }

  if (user) {
    user.email = email;
    user.firstName = firstName;
    user.lastName = lastName;
    user.role = role;
    try {
      await user.save();
    } catch (err) {
      const error = new HttpError(
        "Something went wrong, could not update user.",
        500
      );
      throw error;
    }
  }

  return user;
};

module.exports.deleteUser = async (userId) => {
  try {
    const user = await UserModel.findById(userId);
  } catch (err) {
    const error = new HttpError(
      "Updating user failed, user with that id doesnt exists.",
      404
    );
    throw error;
  }
  if (user) {
    try {
      await UserExerciseModel.deleteMany({ user: userId });
    } catch (err) {
      const error = new HttpError(
        "Cannot delete user because deleting user exercises failed, please try again later.",
        500
      );
      throw error;
    }
  }
  try {
    await UserModel.deleteOne({ id: userId });
  } catch (error) {
    throw new HttpError("deleting user failed. Please try again", 500);
  }
  return "User deleted successfuly";
};

module.exports.getByUserId = async (userId) => {
  console.log(userId);
  let user;
  try {
     user = await UserModel.findById(userId);
  } catch (err) {
    const error = new HttpError(
      "Fetching users failed, please try again later.",
      500
    );
    throw error;
  }

  if (!user || user.length === 0) {
    throw new HttpError("Could not find users in database.", 404);
  }
  return user;
};
