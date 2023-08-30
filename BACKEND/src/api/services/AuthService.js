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
const nodemailer = require("nodemailer");
const { options } = require("../routes/v1/auth");

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
  const { email, password, firstName, lastName, picture } = req.body;
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
      ...(req.file && { picture: req.file.filename }),
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
    const { email, password } = req.body;
    const users = await UserModel.find({ email: email });
    if (!users || users.length === 0) {
      throw new HttpError("Forbidden, user with that email does not exists", 403);
    }
    const user = users[0];
    let token = "";

    if (await user.passwordMatches(password)) {
      token = user.token();
    } else {
      throw new HttpError("Forbidden wrong password", 403);
    }
    const expiresIn = moment().add(jwtExpirationInterval, "minutes");
    const tokenExpiration = expiresIn.toDate();
    return {
      token: token,
      tokenExpiration: tokenExpiration,
      userId: user.id,
      role: user.role,
    };
  } catch (error) {
    console.log("---error--", error.code);
    throw error;
  }
};

module.exports.forgotPassword = async (req) => {
  const { email, otp } = req.body;
  console.log(req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }
  try {
    const users = await UserModel.find({ email: email });
    if (!users || users.length === 0) {
      throw new HttpError("User with that email does not exists", 404);
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      auth: {
        user: "guja.veramarija@gmail.com",
        pass: "mczlbtghaslyphui",
      },
    });

    const mailOptions = {
      from: "guja.veramarija@gmail.com",
      to: email,
      subject: "PASSWORD RESET",
      html: `<html>
                 <body>
                   <h2>Password Recovery</h2>
                   <p>Click on link below and enter this code: ${otp}</p>
                   <h3>${"http://localhost:3000/resetPassword"}</h3>
                 </body>
               </html>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        throw new HttpError("An error occurred while sending the email", 500);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch (error) {
    console.log("---error--", error.code);
    throw error;
  }
  return "email sent";
};

module.exports.resetPassword = async (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }
  const { email, password, realOTP, enteredOTP } = req.body;
  console.log("req.body", req.body);
  try {
    if (realOTP != enteredOTP) {
      throw new HttpError("Invalid 4 digit code", 422);
    }
    const users = await UserModel.find({ email: email });
    if (!users || users.length === 0) {
      throw new HttpError("User with that email does not exists", 404);
    }
    const user = users[0];
    user.password = password;
    await user.save();
    return user;
  } catch (error) {
    throw error;
  }
};

//mczlbtghaslyphui
