// const validator = require('validator');

const validate = (user) => {
  let error = {};

  if (!user.email) {
    error.email = 'Please Provide your Valid Email ';
  }

  if (!user.password) {
    error.password = 'Please Provide a password';
  } else if (user.password < 4) {
    error.password = 'Password must be greater then 4 digits';
  }

  return {
    error,
    isValid: Object.keys(error).length === 0,
  };
};

module.exports = validate;
