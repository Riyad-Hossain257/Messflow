import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'http://localhost:4000/api/poll/';

// const API_URL = "https://messfactor.herokuapp.com/api/";

/////////////
const createPoll = (poll) => {
  return axios
    .post(API_URL + 'create', poll, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};
/////////////

/////////////
const getAllPoll = (date) => {
  return axios
    .get(API_URL + `daily?date=${date}`, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};
/////////////

const getApartments = () => {
  return axios
    .get(API_URL + `apartments`, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

/////////////
const addVote = (vote) => {
  return axios
    .patch(API_URL + 'vote', vote, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};
/////////////

/////////////
const removePoll = (_id) => {
  return axios.delete(API_URL + `${_id}`, { headers: authHeader() });
};
/////////////

const pollService = {
  createPoll,
  getAllPoll,
  getApartments,
  addVote,
  removePoll,
};

export default pollService;
