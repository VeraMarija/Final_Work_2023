const httpStatus = require("http-status");
const passport = require("passport");
const UserModel = require("../models/UserModel");
const APIError = require("../errors/apiError");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../../config/vars");
const HttpError = require("../errors/httpError");

exports.checkAuth = async (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1]; // Bearer 'mytoken'

    if (!token) {
      throw new APIError({
        code: httpStatus.UNAUTHORIZED,
        message: "Unauthorized",
      });
    }
    const decodedToken = jwt.verify(token, jwtSecret);
    req.user = decodedToken.userId;
    return next();
  } catch (err) {
    const error = new HttpError("Unathorized", 401);
    return next(error);
  }
};

exports.checkPermission = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.user); // umjesto headera mogu res.user koristit ubaččen u auth
    if (!user) throw new APIError("Something went wrong, try again", 500);
    const role = user.role;
    if (role === "admin" || req.user === req.params.userId) {
      return next();
    } else {
      const error = new HttpError(
        "Forbidden, you do not have permission.",
        403
      );
      throw error;
    }
  } catch (err) {
    return next(err);
  }
};

/*const jwtAuth = (req, res, next, role) => async (err, user, info) => {
  console.log("---------roles---------", role);
  const logIn = req.logIn;
  const apiError = new APIError({
    message: err ? err.message : "Unauthorized",
    code: httpStatus.UNAUTHORIZED,
    stack: err ? err.stack : undefined,
  });cd

  try {
    if (err || !user) throw err;
    await logIn(user, { session: false });
  } catch (e) {
    return next(apiError);
  }

  if (role === "user" && req.params.userId !== user._id.toString()) {
    apiError.code = httpStatus.FORBIDDEN;
    apiError.message = "Forbidden";
    return next(apiError);
  }

  req.user = user;

  return next();
};

exports.authorize = (role) => (req, res, next) =>
  passport.authenticate(
    "jwt",
    { session: false },
    jwtAuth(req, res, next, role)
  )(req, res, next);

  */
