const { Int32 } = require("mongodb");
const mongoose = require("mongoose");

//napravljeno kako bi se pratio progres mozda tablica
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
    timeUpdated: { //updatat ce se kad se reacha maximum ponavljanja
                  //ili kada korisnik updata svoj userexercise s novim repmaxom
        type: Date,
        required: true,
    },

  }
);

module.exports = mongoose.model("userExerciseWeight", userExerciseWeightSchema);
