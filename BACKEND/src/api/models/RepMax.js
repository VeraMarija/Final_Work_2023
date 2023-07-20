const { Int32 } = require("mongodb");
const mongoose = require("mongoose");

const repMaxSchema = new mongoose.Schema(
  {
    userExercise: {
      type: Schema.Types.ObjectId,
      ref: "UserExercise",
    },
    liftWeight: {
      type: Int32,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("RepMax", repMaxSchema);
