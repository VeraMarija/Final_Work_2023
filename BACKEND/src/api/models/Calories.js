const { number } = require("joi");
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
    TEEtarget: {
      type: Number,
      required: true,
    },
    weeks: {
      type: Number,
      required: true,
    },
    calorieDeficit: {
      type: Number,
      required: true,
    },
    currentWeight:{
      type: Number,
      required: true,
    },
    targetWeight: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    gender: {
      type:String,
      required:true,
    },
    age:{
      type: Number,
      required: true,
    },
    activity:{
      type:String,
      required:true,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Calorie", caloriesSchema);
