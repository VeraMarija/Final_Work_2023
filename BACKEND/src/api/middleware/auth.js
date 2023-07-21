const httpStatus = require("http-status");
const passport = require("passport");
const UserModel = require("../models/UserModel");
const APIError = require("../errors/apiError");

const jwtAuth = (req, res, next, role) => async (err, user, info) => {
  console.log("---------roles---------", role);
  const logIn = req.logIn;
  const apiError = new APIError({
    message: err ? err.message : "Unauthorized",
    status: httpStatus.UNAUTHORIZED,
    stack: err ? err.stack : undefined,
  });

  try {
    if (err || !user) throw err;
    await logIn(user, { session: false });
  } catch (e) {
    return next(apiError);
  }

  if (role === "user" && req.params.userId !== user._id.toString()) {
    apiError.status = httpStatus.FORBIDDEN;
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
