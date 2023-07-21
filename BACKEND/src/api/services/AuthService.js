const httpStatus = require("http-status");
const moment = require("moment-timezone");
const { omit } = require("lodash");
const UserModel = require("../models/UserModel");
const RefreshToken = require("../models/RefreshTokenModel");
const PasswordResetToken = require("../models/PasswordResetToken");
const { jwtExpirationInterval } = require("../../config/vars");
const APIError = require("../errors/apiError");

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
  try {
    const { email, password, firstName, lastName } = req.body;
    const user = await new UserModel({
      email,
      password,
      firstName,
      lastName,
    }).save();

    const token = generateTokenResponse(user, user.token());
    return { token, user: user };
  } catch (error) {
    throw UserModel.checkDuplicateEmail(error);
  }
};

module.exports.login = async (req) => {
  try {
    const { user, accessToken } = await UserModel.findAndGenerateToken(req.body);
    const token = generateTokenResponse(user, accessToken);
    return { token, user: user };
  } catch (error) {
    throw error;
  }
};
