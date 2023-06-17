import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'http://localhost:4000/api/';

// const API_URL = "https://messfactor.herokuapp.com/api/";

/////////////
const createFloors = (floors) => {
  return axios
    .post(API_URL + 'createfloors', floors, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};
/////////////

/////////////
const addApartment = (apartData) => {
  return axios
    .post(API_URL + 'addApartment', apartData, { headers: authHeader() })
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
const updateApartment = (updatedData) => {
  return axios
    .post(API_URL + 'updateApartment', updatedData, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};
/////////////

/////////////
const removeApartment = (apartmentId) => {
  return axios.delete(API_URL + `${apartmentId}`, { headers: authHeader() });
};
/////////////

const moderatorService = {
  createFloors,
  addApartment,
  getApartments,
  updateApartment,
  removeApartment,
};

export default moderatorService;
