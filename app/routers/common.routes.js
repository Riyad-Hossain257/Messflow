const router = require("express").Router();
const authenticate = require("../authenticate");
const {
  createMeal,
  getDailyMeal,
  getMonthlyMealRate,
  getUserMontlyMeal,
  getMonthlyUserBill,
  getMonthlyAllMeal,
  updateMeal,
  getYearlyData,
} = require("../Controllers/commonControllers/mealController");

router.post("/meal/create", authenticate, createMeal);

router.post("/meal/update", authenticate, updateMeal);

router.get("/monthlyMeal", authenticate, getUserMontlyMeal);

router.get("/yearlyData", authenticate, getYearlyData);

router.get("/dailyMeal", authenticate, getDailyMeal);

router.get("/monthlyUserBill", authenticate, getMonthlyUserBill);

router.get("/monthlyMealRate", authenticate, getMonthlyMealRate);

router.get("/meal/:month/:year", authenticate, getMonthlyAllMeal);

module.exports = router;
