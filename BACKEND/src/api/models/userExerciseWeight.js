const { Int32 } = require("mongodb");
const mongoose = require("mongoose");

const userExerciseWeightSchema = new mongoose.Schema(
  {
    userExercise: {
      type: Schema.Types.ObjectId,
      ref: "UserExercise",
    },
    firstSet: {
        type: Int32,
        required: true,
    },
    secondSet: {
        type: Int32,
        required: true,
    },
    thirdSet: {
        type: Int32,
        required: true,
    },
    timeUpdated: {
        type: Date,
        required: true,
    },

  }
);

module.exports = mongoose.model("userExerciseWeight", userExerciseWeightSchema);
