const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messBudgetSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  messName: {
    type: String,
    required: true,
  },
  totalSeats: {
    type: Number,
  },

  utilityBills: {
    perSeatRent: {
      type: Number,
    },
    homeMaid: {
      type: Number,
    },
    wifi: {
      type: Number,
    },
  },
});

const BudgetModel = mongoose.model("BudgetModel", messBudgetSchema);
module.exports = BudgetModel;
