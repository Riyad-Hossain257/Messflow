import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:4000/api/';

// const API_URL = "https://messfactor.herokuapp.com/api/";

/////////////
const createMeal = (mealData) => {
  return axios
    .post(API_URL + 'meal/create', mealData, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const getDailyMeals = () => {
  return axios
    .get(API_URL + `dailyMeal`, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const getMonthlyMeal = () => {
  return axios
    .get(API_URL + `monthlyMeal`, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const getMonthlyAllMeal = ({ month, year }) => {
  return axios
    .get(API_URL + `meal/${month}/${year}`, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const getMonthlyMealRate = () => {
  return axios
    .get(API_URL + `monthlyMealRate`, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const getMonthlyUserBill = () => {
  return axios
    .get(API_URL + `monthlyUserBill`, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const getYearlyData = () => {
  return axios
    .get(API_URL + `yearlyData`, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};
const userService = {
  createMeal,
  getDailyMeals,
  getMonthlyMeal,
  getMonthlyAllMeal,
  getMonthlyMealRate,
  getMonthlyUserBill,
  getYearlyData,
};

export default userService;
