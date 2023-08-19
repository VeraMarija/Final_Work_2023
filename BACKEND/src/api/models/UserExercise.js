const mongoose = require("mongoose");
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
      type: Number,
      required: true,
    },
    repetition: {
      type: Number,
      required: true,
    },
    repMax: {
      type: Number,
      required: true,
    },
    firstSet: { //12-15 ponavljanja
      type: Number,
      required: true,
    },
    secondSet: {  //8-12 ponavljanja
      type: Number,
      required: true,
    },
    thirdSet: {  //5-8 ponavljanja
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("UserExercise", userExerciseSchema);
