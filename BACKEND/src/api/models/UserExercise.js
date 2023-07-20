const { Int32 } = require("mongodb");
const mongoose = require("mongoose");

const userExerciseSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    exercise: {
      type: Schema.Types.ObjectId,
      ref: "Exercise",
    },
    liftWeight: {
      type: Int32,
      required: true,
    },
    repetition: {
      type: Int32,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("UserExercise", userExerciseSchema);
