const mongoose = require("mongoose");
const httpStatus = require("http-status");
const { omitBy, isNil } = require("lodash");
const bcrypt = require("bcryptjs");
const moment = require("moment-timezone");
const jwt = require("jwt-simple");
const uuidv4 = require("uuid");
const APIError = require("../errors/apiError");
const { env, jwtSecret, jwtExpirationInterval } = require("../../config/vars");

const Schema = mongoose.Schema;

const roles = ["user", "admin"];

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 128,
    },
    firstName: {
      type: String,
      maxlength: 128,
      index: true,
      trim: true,
    },
    lastName: {
      type: String,
      maxlength: 128,
      index: true,
      trim: true,
    },
    role: {
      type: String,
      enum: roles,
      default: "user",
    },
    picture: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * my pre-save hook
 */
userSchema.pre("save", async function save(next) {
  try {
    if (!this.isModified("password")) return next();
    const rounds = 10;
    const hash = await bcrypt.hash(this.password, rounds);
    this.password = hash;
    return next();
  } catch (error) {
    return next(error);
  }
});

/**
 * my methods
 */
userSchema.method({
  token() {
    const payload = {
      exp: moment().add(jwtExpirationInterval, "minutes").unix(),
      iat: moment().unix(),
      userId: this._id, 
    };
    const token = jwt.encode(payload, jwtSecret);
    return { token }; 
  },

  async passwordMatches(password) {
    return bcrypt.compare(password, this.password);
  },
});

/**
 * my static methods
 * methods that run from the context of the entire Model
 */
userSchema.statics = {
  roles,

  /**
   * Return new validation error
   * if error is a mongoose duplicate key error
   *
   * @param {Error} error
   * @returns {Error|APIError}
   */
  checkDuplicateEmail(error) {
    if (error.name === "MongoServerError" && error.code === 11000) {
      return new APIError({
        message:
          "User with that email already exists, try with another email or go to login",
        errors: [
          {
            field: "email",
            location: "body",
            messages: ['"email" already exists'],
          },
        ],
        code: httpStatus.CONFLICT,
        isPublic: true,
        stack: error.stack,
      });
    }
    return error;
  },
};

module.exports = mongoose.model("User", userSchema);
