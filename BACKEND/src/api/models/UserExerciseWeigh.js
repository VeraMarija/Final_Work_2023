const mongoose = require("mongoose");
const { Decimal } = require("mongoose/lib/schema/index");

//napravljeno kako bi se pratio progres mozda tablica
const userExerciseWeightSchema = new mongoose.Schema({
  userExercise: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserExercise",
  },
  firstSet: {
    type: Decimal,
    required: true,
  },
  secondSet: {
    type: Decimal,
    required: true,
  },
  thirdSet: {
    type: Decimal,
    required: true,
  },
  timeUpdated: {
    //updatat ce se kad se reacha maximum ponavljanja
    //ili kada korisnik updata svoj userexercise s novim repmaxom
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("userExerciseWeight", userExerciseWeightSchema);
