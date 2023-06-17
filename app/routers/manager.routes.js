const router = require("express").Router();
const authenticate = require("../authenticate");
const {
  createExpense,
  getMonthlyExpense,
  updateExpense,
  removeExpense,
  getMonthlyTotalExpense,
} = require("../Controllers/managerControllers/expenseController");

const {
  createMess,
  updateMess,
  removeMess,
  getAllInfo,
  removeUser,
} = require("../Controllers/managerControllers/messInfoController");
const {
  createBill,
  getMonthlyBill,
  getTotalMealBudget,
  updateBill,
  getAllUsers,
  removeBill,
} = require("../Controllers/managerControllers/userBillController");

router.post("/mess/create", authenticate, createMess);

router.get("/mess", authenticate, getAllInfo);

router.put("/mess/update", authenticate, updateMess);

router.delete("/mess/:messId", removeMess);

router.delete("/user/:_id", authenticate, removeUser);

router.post("/bill/create", authenticate, createBill);

router.get("/bill/:month/:year", authenticate, getMonthlyBill);

router.get("/bill/budget", getTotalMealBudget);

router.post("/bill/update", authenticate, updateBill);

router.delete("/bill/:_id", authenticate, removeBill);

router.post("/expense/createExp", authenticate, createExpense);

router.get("/expense/:month/:year", authenticate, getMonthlyExpense);

router.get("/totalExpense/:month/:year", getMonthlyTotalExpense);

router.post("/expense/update", authenticate, updateExpense);

router.delete("/expense/:expId", removeExpense);

router.get("/users", authenticate, getAllUsers);

module.exports = router;
