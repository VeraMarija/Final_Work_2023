const httpStatus = require("http-status");
const moment = require("moment-timezone");
const { omit } = require("lodash");
const UserModel = require("../models/UserModel");
const RefreshToken = require("../models/RefreshTokenModel");
const PasswordResetToken = require("../models/PasswordResetToken");
const { jwtExpirationInterval } = require("../../config/vars");
const APIError = require("../errors/apiError");
const HttpError = require("../errors/httpError");
const { validationResult } = require("express-validator");

function generateTokenResponse(user, accessToken) {
  const tokenType = "Bearer";
  const refreshToken = RefreshToken.createRefreshToken(user).token;
  const expiresIn = moment().add(jwtExpirationInterval, "minutes");
  return {
    tokenType,
    accessToken,
    refreshToken,
    expiresIn,
  };
}

module.exports.register = async (req) => {
  const { email, password, firstName, lastName } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }
  try {
    const user = await new UserModel({
      email,
      password,
      firstName,
      lastName,
    }).save();
    const finalUser = await UserModel.findOne({email: email}, '-password -updatedAt -__v');
    //const token = generateTokenResponse(user, user.token());
    const token = finalUser.token(); //token smo kreirali
    return { token, user: finalUser };
  } catch (error) {
    throw UserModel.checkDuplicateEmail(error);
  }
};

module.exports.login = async (req) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }
  try {
    const user = await UserModel.findOne({email: email}, '-password -updatedAt -__v');
    //const token = generateTokenResponse(user, accessToken);
    const token = user.token();
    return {token, user};
  } catch (error) {
    console.log('---error--', error.code);
    throw error;
  }
};
