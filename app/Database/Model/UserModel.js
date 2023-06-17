const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  messId: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const UserModel = mongoose.model("UserModel", userserSchema);
module.exports = UserModel;
