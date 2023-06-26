const FoodMenuPoll = require('../../Database/Model/FoodMenuPoll');
const { resourceError, serverError } = require('../../utils/error');

const createPoll = async (req, res) => {
  const { date, when, food_items } = req.body;
  //   const { messId } = req.user;
  const messId = 11;

  try {
    const newPoll = new FoodMenuPoll({
      messId,
      when,
      date,
      food_items,
    });

    // Check if a poll with the same date and when value already exists
    const existingPoll = await FoodMenuPoll.findOne({ messId, date, when });

    if (existingPoll) {
      // Poll already exists for the given date and when value
      resourceError(res, `Poll already created for ${when} on ${date}`);
    } else {
      newPoll.save();

      res.status(200).json({
        message: 'Poll created',
      });
    }
  } catch (error) {
    serverError(res, error);
  }
};

const getDailyPoll = async (req, res) => {
  const { date } = req.query;
  const messId = 11;
  try {
    // Check if a poll with the same date and when value already exists
    const existingPolls = await FoodMenuPoll.find({ messId, date });

    if (existingPolls) {
      // Poll already exists for the given date and when value
      return res.status(200).json(existingPolls);
    }
  } catch (error) {}
};

const deleteSpecificPoll = async (req, res) => {
  const { id } = req.params;
  //   const { messId } = req.user;
  const messId = 11;

  try {
    // Check if a poll with the same date and when value already exists
    const result = await FoodMenuPoll.findByIdAndDelete(id);

    if (result) {
      res.status(200).json({
        message: 'Poll Deleted',
      });
    } else {
      resourceError(res, 'somthing went wrong!');
    }
  } catch (error) {
    serverError(res, error);
  }
};

const addVote = async (req, res) => {
  const { _id, pollId, vote, voter, item_name } = req.body;
  //   const { messId } = req.user;
  const messId = 11;

  try {
    const voteSubmited = await FoodMenuPoll.findOneAndUpdate(
      {
        _id: pollId,
        messId: messId,
        'food_items.item_name': item_name,
      },
      {
        $inc: { 'food_items.$.vote': 1 },
        $addToSet: { 'food_items.$.voters': voter },
      },
      { new: true }
    );
    if (voteSubmited) {
      res.status(200).json({
        voteSubmited,
        message: 'vote created',
      });
    } else {
      // Poll already exists for the given date and when value
      resourceError(res, `somthing wrong`);
    }
  } catch (error) {
    serverError(res, error);
  }
};

module.exports = {
  createPoll,
  getDailyPoll,
  deleteSpecificPoll,
  addVote,
};
