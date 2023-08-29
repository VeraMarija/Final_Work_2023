const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const caloriesSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    TEEmaintain: {
      type: Number,
      required: true,
    },
    TEEtarget:
      {
        type: Number,
        required: true,
      },
    
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Calorie", caloriesSchema);
