const mongoose = require("mongoose");
const crypto = require("crypto");
const moment = require("moment-timezone");

const refreshTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    index: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  userEmail: {
    type: "String",
    ref: "User",
    required: true,
  },
  expires: { type: Date },
});

refreshTokenSchema.statics = {
  createRefreshToken(user) {
    const userId = user._id;
    const userEmail = user.email;
    const token = `${userId}.${crypto.randomBytes(40).toString("hex")}`;
    const expires = moment().add(30, "days").toDate();
    const refreshTokenObject = new RefreshToken({
      token,
      userId,
      userEmail,
      expires,
    });
    refreshTokenObject.save();
    return refreshTokenObject;
  },
};

const RefreshToken = mongoose.model("RefreshToken", refreshTokenSchema);
module.exports = RefreshToken;
