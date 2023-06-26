const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messFoodMenuPoll = new Schema({
  messId: {
    type: String,
    required: true,
  },

  when: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  food_items: [
    {
      item_name: {
        type: String,
        require: true,
      },
      vote: {
        type: Number,
        default: 0,
      },
      voters: {
        type: Array,
      },
    },
  ],
});

const FoodMenuPoll = mongoose.model('FoodMenuPoll', messFoodMenuPoll);
module.exports = FoodMenuPoll;
