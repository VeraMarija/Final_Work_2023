const mongoose = require("mongoose");
const { Decimal } = require("mongoose/lib/schema/index");

//napravljeno kako bi se pratio progres mozda tablica
const exerciseWeightSchema = new mongoose.Schema(
  {
    userExercise: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserExercise",
    },
    firstSet: { //12-15 ponavljanja
      type: Decimal,
      required: true,
    },
    secondSet: {  //8-12 ponavljanja
      type: Decimal,
      required: true,
    },
    thirdSet: {  //5-8 ponavljanja
      type: Decimal,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("exerciseWeight", exerciseWeightSchema);
