const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mealSchema = new Schema({
  // _id==messId
  _id: {
    type: String,
    required: true,
  },

  userMeal: [
    {
      userId: {
        type: String,
      },
      name: {
        type: String,
      },
      morning: {
        type: Number,
      },
      day: {
        type: Number,
      },
      night: {
        type: Number,
      },
      date: {
        type: Date,
      },
    },
  ],
});

const MealModel = mongoose.model("MealModel", mealSchema);
module.exports = MealModel;
