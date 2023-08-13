//const { Int32 } = require("mongodb");
const mongoose = require("mongoose");
const { Decimal } = require("mongoose/lib/schema/index");
const {Schema} = mongoose;

const userExerciseSchema = new Schema(
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
      type: Decimal,
      required: true,
    },
    repetition: {
      type: Decimal,
      required: true,
    },
    repMax: {
      type: Decimal,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("UserExercise", userExerciseSchema);
