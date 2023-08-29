const { Int32 } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const repMaxSchema = new mongoose.Schema(
  {
    userExercise: {
      type: Schema.Types.ObjectId,
      ref: "UserExercise",
    },
    repMax: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("RepMax", repMaxSchema);
