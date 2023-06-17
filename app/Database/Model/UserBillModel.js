const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userBillSchema = new Schema({
  // _id==messId
  _id: {
    type: String,
    required: true,
  },
  userBill: [
    {
      userId: {
        type: String,
      },
      userName: {
        type: String,
      },
      rent: {
        type: Number,
      },
      wifi: {
        type: Number,
      },
      currentBill: {
        type: Number,
      },
      homeMaid: {
        type: Number,
      },
      mealBudget: {
        type: Number,
      },
      date: {
        type: Date,
      },
    },
  ],
});

const UserBillModel = mongoose.model("UserBillModel", userBillSchema);
module.exports = UserBillModel;
