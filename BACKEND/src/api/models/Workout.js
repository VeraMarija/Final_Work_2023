//const { Int32 } = require("mongodb");
const mongoose = require("mongoose");
const { Decimal } = require("mongoose/lib/schema/index");
const { Schema } = mongoose;

const workoutSchema = new Schema(
  {
    userExercises: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserExercise",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Workout", workoutSchema);
