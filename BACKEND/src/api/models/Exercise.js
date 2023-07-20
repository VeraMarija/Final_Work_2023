const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const exerciseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    instructions: {
      type: String,
      required: true,
    },
    equipment: [
      {
        type: String,
      },
    ],
    picture: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Exercise", exerciseSchema);
