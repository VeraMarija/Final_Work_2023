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
const jwt = require("jsonwebtoken");

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
    const finalUser = await UserModel.findOne(
      { email: email },
      "-password -updatedAt -__v"
    );
    const token = finalUser.token(); //token smo kreirali
    const tokenExpiration = new Date(token.exp * 1000);
    return {
      token,
      tokenExpiration: tokenExpiration,
      userId: finalUser.id,
      role: finalUser.role,
    };
  } catch (error) {
    throw UserModel.checkDuplicateEmail(error);
  }
};

module.exports.login = async (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }
  try {
    const { user, accessToken } = await UserModel.findAndGenerateToken(req.body)
    const expiresIn = moment().add(jwtExpirationInterval, "minutes");
    const tokenExpiration = expiresIn.toDate();
    return {
      token: accessToken,
      tokenExpiration: tokenExpiration,
      userId: user.id,
      role: user.role,
    };
  } catch (error) {
    console.log("---error--", error.code);
    throw error;
  }
};
