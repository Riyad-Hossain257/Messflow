const {
  createPoll,
  getDailyPoll,
  deleteSpecificPoll,
  addVote,
} = require('../Controllers/managerControllers/pollController');

const router = require('express').Router();

router.post('/create', createPoll);
router.get('/daily', getDailyPoll);
router.delete('/:id', deleteSpecificPoll);
router.patch('/vote', addVote);

module.exports = router;
