const UserModel = require("../models/UserModel");
const HttpError = require("../errors/httpError");
const { validationResult } = require("express-validator");

module.exports.getAll = async () => {
  const users = await UserModel.find();
  if (!users) {
    throw new Error("No users in database!");
  }
  console.log('users---------', users);
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
      "Signing up failed, please try again later.",
      500
    );
    throw error;
  }

  return user;
};
