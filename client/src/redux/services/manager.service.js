import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'http://localhost:4000/api/';

// const API_URL = "https://messfactor.herokuapp.com/api/";

////////////////// mess //////////////////
const createMess = (messInfo) => {
  return axios
    .post(API_URL + 'mess/create', messInfo, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const getMessInfo = () => {
  return axios
    .get(API_URL + `mess`, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const updateMessInfo = (updatedData) => {
  return axios
    .put(API_URL + 'mess/update', updatedData, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

////////////////// Expense ////////////////////////

const createExpense = (expenseInfo) => {
  return axios
    .post(API_URL + 'expense/createExp', expenseInfo, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const getMonthlyExpense = ({ month, year }) => {
  return axios
    .get(API_URL + `expense/${month}/${year}`, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const updateExpense = (updatedData) => {
  return axios
    .post(API_URL + 'expense/update', updatedData, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

///////////// User /////////////////
const getAllUser = () => {
  return axios
    .get(API_URL + `users`, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const removeUser = (_id) => {
  return axios.delete(API_URL + `user/${_id}`, { headers: authHeader() });
};
////////////////// Bill //////////////////////

const createBill = (billData) => {
  return axios
    .post(API_URL + 'bill/create', billData, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const getMonthlyBill = ({ month, year }) => {
  return axios
    .get(API_URL + `bill/${month}/${year}`, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const updateBill = (updatedData) => {
  return axios
    .post(API_URL + 'bill/update', updatedData, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const removeBill = (_id) => {
  return axios.delete(API_URL + `bill/${_id}`, { headers: authHeader() });
};

//////////////////// Meal //////////////////////
const updateMeal = (updatedData) => {
  return axios
    .post(API_URL + 'meal/update', updatedData, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

/////////////

/////////////

const managerService = {
  createMess,
  getMessInfo,
  createExpense,
  getAllUser,
  getMonthlyExpense,
  updateExpense,
  getMonthlyBill,
  updateMessInfo,
  createBill,
  updateBill,
  updateMeal,
  removeUser,
  removeBill,
};

export default managerService;
