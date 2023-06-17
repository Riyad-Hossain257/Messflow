const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messInfoSchema = new Schema({
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
  // utilityBills: {
  perSeatRent: {
    type: Number,
  },
  homeMaid: {
    type: Number,
  },
  wifi: {
    type: Number,
  },
  currentBill: {
    type: Number,
  },
  // },
});

const MessInfoModel = mongoose.model("MessInfoModel", messInfoSchema);
module.exports = MessInfoModel;
