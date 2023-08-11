const express = require("express");
const methodOverride = require("method-override");
const cors = require("cors");
const helmet = require("helmet");
const passport = require("passport");
const routes = require("../api/routes/v1");
const { logs } = require("./vars");
const jwt = require("./passport");
const HttpError = require("../api/errors/httpError");
//const error = require('../api/middlewares/error');

/**
 * Express instance
 * @public
 */
const app = express();
app.use(express.json());

// lets you use HTTP verbs such as PUT or DELETE
// in places where the client doesn't support it
app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// enable authentication
app.use(passport.initialize());
passport.use("jwt", jwt);
//passport.use('facebook', strategies.facebook);
//passport.use('google', strategies.google);F

// mount api v1 routes

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE"
  );
  next();
});

app.use("/v1", routes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

app.use((error, req, res, next) => {
    if (res.headerSent) {
      return next(error);
    }
    console.log(error);
    res.status(error.code || 500);
    res.json({ error: error.message || 'An unknown error occurred!' });
    
  });

module.exports = app;
