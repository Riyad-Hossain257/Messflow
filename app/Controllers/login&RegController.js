const User = require('../Database/Model/UserModel');
const Login = require('../Database/Model/LoginModel');
const registerValidator = require('../validator/registerValidator');
const loginValidator = require('../validator/loginValidator');
const { serverError, resourceError } = require('../utils/error');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {
  managerRegister(req, res) {
    let { name, phone, email, password } = req.body;

    Login.findOne({ email: email })
      .then((user) => {
        if (user) {
          return resourceError(res, 'Email Already Exists.');
        }

        bcrypt.hash(password, 11, (err, hash) => {
          if (err) {
            return resourceError(res, 'Server Error Occurred.');
          }
          let user = new Login({
            phone: phone,
            name,
            email,
            password: hash,
            type: 'manager',
          });
          user
            .save()
            .then((user) => {
              res.status(201).json({
                message: 'Successfully Register ',
                // user,
              });
              // return user;
            })

            .then((user) => {
              // if (user.type === "normal_user") {
              let setUser = new User({
                name,
                phone,
                email,
              });
              return setUser.save();
              // }
              // else if (user.type === "manager") {
              //   let setManager = new Manager({ name, phone, email, messId });
              //   return setManager.save();
              // }
            })
            .catch((error) => serverError(res, error));
        });
      })
      .catch((error) => {
        serverError(res, error);
      });
    // }
  },

  userRegister(req, res) {
    let { name, phone, email, password, messId } = req.body;

    Login.findOne({ email: email })
      .then((user) => {
        if (user) {
          return resourceError(res, 'Email Already Exists.');
        }

        bcrypt.hash(password, 11, (err, hash) => {
          if (err) {
            return resourceError(res, 'Server Error Occurred.');
          }
          let user = new Login({
            phone: phone,
            name,
            email,
            password: hash,
            type: 'user',
            messId,
          });
          user
            .save()
            .then((user) => {
              res.status(201).json({
                message: 'Successfully Register ',
                // user,
              });
              // return user;
            })

            .then((user) => {
              // if (user.type === "normal_user") {
              let setUser = new User({ name, phone, email, messId });
              return setUser.save();
              // }
              // else if (user.type === "manager") {
              //   let setManager = new Manager({ name, phone, email, messId });
              //   return setManager.save();
              // }
            })
            .catch((error) => serverError(res, error));
        });
      })
      .catch((error) => {
        serverError(res, error);
      });
    // }
  },

  login(req, res) {
    const { email, password } = req.body;
    const validate = loginValidator({ email, password });

    if (!validate.isValid) {
      return res.status(400).json(validate.error);
    }
    Login.findOne({ email: email })

      .then((user) => {
        if (!user) {
          return resourceError(res, 'User Not Found');
        }

        bcrypt.compare(password, user.password, (err, result) => {
          if (err) {
            return serverError(res, err);
          }

          if (!result) {
            return resourceError(res, 'Password dose not match');
          }
          let token = jwt.sign(
            {
              _id: user._id,
              name: user.name,
              type: user.type,
              phone: user.phone,
              email: user.email,
            },
            process.env.SECRET,
            { expiresIn: '2h' }
          );

          res.status(200).json({
            message: 'Login Successfull',
            _id: user._id,
            token: `Bearer ${token}`,
            name: user.name,
            type: user.type,
            phone: user.phone,
          });
        });
      })
      .catch((error) => serverError(res, error));
  },
};
