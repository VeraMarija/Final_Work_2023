const mongoose = require("mongoose");
const UserModel = require("../models/UserModel");
const UserExerciseModel = require("../models/UserExercise");
const HttpError = require("../errors/httpError");
const { validationResult } = require("express-validator");
const userExerciseService = require("../services/UserExerciseService");
const fs = require("fs");

module.exports.getAll = async () => {
  const users = await UserModel.find();
  if (!users) {
    throw new Error("No users in database!");
  }
  return users;
};

module.exports.createUser = async (req) => {
  const { email, password, firstName, lastName } = req.body;
  let existingUser;
  try {
    existingUser = await UserModel.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Something went wrong", 500);
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
  const user = await new UserModel({
    email,
    password,
    firstName,
    lastName,
    ...(req.file && { picture: req.file.filename }),
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
  const { firstName, lastName, email, isActive } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }
  try {
    const user = await UserModel.findById(req.params.userId);

    if (user) {
      user.email = email;
      user.firstName = firstName;
      user.lastName = lastName;
      if (isActive === "true" || isActive === "false" ) user.isActive = isActive;      
      if (req.file) user.picture = req.file.filename;
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
  } catch (err) {
    const error = new HttpError(
      "Updating user failed, user with that id doesnt exists.",
      404
    );
    throw error;
  }
};

module.exports.deleteUser = async (req) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    if (!user) {
      throw new HttpError(
        "Deleting user failed, user with that id doesnt exists.",
        404
      );
    }
    user.isActive = false;
    await user.save();
    /*  if(user.picture){
      const imagePath = "C:/Users/gujav/Documents/Final_Work_2023/BACKEND/src/api/uploads/" + user.picture;
      fs.unlink(imagePath, err => {
        if(err){
          throw new HttpError(err.message, 500);
        }
      });
    } */
    //await UserModel.findByIdAndRemove(userId);

    return "User deleted successfuly";
  } catch (err) {
    throw err;
  }
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
