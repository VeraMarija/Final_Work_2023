const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const caloriesSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    TEEmantain: {
      type: String,
      required: true,
    },
    TEEgoal: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Calorie", caloriesSchema);
