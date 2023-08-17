const express = require("express");
const methodOverride = require("method-override");
const cors = require("cors");
const helmet = require("helmet");
const passport = require("passport");
const routes = require("../api/routes/v1");
const { logs } = require("./vars");
const jwt = require("./passport");
const HttpError = require("../api/errors/httpError");
const path = require("path");
const fs = require("fs");

const app = express();


app.use("/uploads", express.static('C:/Users/gujav/OneDrive/Radna površina/FinalWork_Backup/Final_Work_2023/BACKEND/src/api/uploads'));

app.use(express.json());

// lets you use HTTP verbs such as PUT or DELETE
// in places where the client doesn't support it
app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// enable authentication
app.use(passport.initialize());
passport.use("jwt", jwt);

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
app.get('/*', function (req, res) {
  console.log('dosa je ovde');
  res.sendFile(path.join(__dirname, 'C:/Users/gujav/Documents/Final_Work_2023/FRONTEND/workoutgenerator/public/index.html'), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});
app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});



module.exports = app;
