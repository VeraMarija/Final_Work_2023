const express = require("express");
const methodOverride = require("method-override");
const cors = require("cors");
const helmet = require("helmet");
const routes = require("../api/routes/v1");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(
  "/uploads",
  express.static(
    "C:/Users/gujav/OneDrive/Radna površina/FinalWork_Backup/Final_Work_2023/BACKEND/src/api/uploads"
  )
);
app.use(express.json());
app.use(methodOverride());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors());
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
app.get("/*", function (req, res) {
  res.sendFile(
    path.join(
      __dirname,
      "C:/Users/gujav/Documents/Final_Work_2023/FRONTEND/workoutgenerator/public/index.html"
    ),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
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
