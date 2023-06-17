const UserBillModel = require("../../Database/Model/UserBillModel");
const LoginDB = require("../../Database/Model/LoginModel");

const { serverError, resourceError } = require("../../utils/error");

module.exports = {
  createBill(req, res) {
    let {
      userId,
      userName,
      rent,
      wifi,
      currentBill,
      homeMaid,
      mealBudget,
      date,
    } = req.body;
    // const messId = "111222";
    const { messId } = req.user;
    let objData = new Object({
      userId,
      userName,
      rent,
      wifi,
      homeMaid,
      currentBill,
      mealBudget,
      date,
    });
    let billData = new UserBillModel({
      //   managerId: userId,
      _id: messId,
      userBill: objData,
    });
    UserBillModel.findOne({ _id: messId })
      .then((mess) => {
        if (mess) {
          mess.userBill.push(objData);
          mess
            .save()
            .then((response) => {
              res.status(201).json({
                message: "Bill Created Successfully",
                mess: response.data,
              });
            })
            .catch((error) => serverError(res, error));
        } else {
          // return resourceError(res, "Please create mess first!");
          billData
            .save()
            .then((response) => {
              res.status(201).json({
                message: "Bill Created Successfully",
              });
            })
            .catch((error) => serverError(res, error));
        }
      })
      .catch((error) => {
        serverError(res, error);
      });
  },

  getMonthlyBill(req, res) {
    // let { _id, role, homeId, homeOwner } = req.user;
    // const messId = "111222";
    const { messId } = req.user;
    UserBillModel.findOne({ _id: messId })
      .then((result) => {
        if (result != null) {
          if (result.userBill.length != 0) {
            let monthlyData = [];
            result.userBill.filter((i) => {
              if (
                new Date(i.date).getMonth() + 1 ===
                  parseInt(req.params.month) &&
                new Date(i.date).getFullYear() === parseInt(req.params.year)
              ) {
                return monthlyData.push(i);
              }
            });

            res.status(200).json(monthlyData);
          } else {
            return resourceError(res, "No Bill Found");
          }
        } else {
          return resourceError(res, "No bill found");
        }
      })
      .catch((error) => serverError(res, error));
  },

  getTotalMealBudget(req, res) {
    const messId = "111222";
    UserBillModel.findOne({ _id: messId })
      .then((mess) => {
        if (mess) {
          if (mess.userBill.length !== 0) {
            let totalBudget = 0;
            for (let i = 0; i < mess.userBill.length; i++) {
              if (
                new Date(mess.userBill[i].date).getMonth() + 1 ===
                  new Date().getMonth() + 1 &&
                new Date(mess.userBill[i].date).getFullYear() ===
                  new Date().getFullYear()
              ) {
                totalBudget += mess.userBill[i].mealBudget;
              }
            }
            res.status(200).json(totalBudget);
          } else {
            res.status(200).json({
              message: "Data not found",
            });
          }
        } else {
          res.status(200).json({
            message: "Data not found",
          });
        }
      })
      .catch((error) => serverError(res, error));
  },

  updateMess(req, res) {
    // let { messId } = req.params;
    const messId = "124";
    MessInfo.findOneAndUpdate(
      { _id: messId },
      { $set: req.body },
      { new: true }
    )
      .then((result) => {
        res.status(200).json({
          message: "Update Successfully",
        });
      })
      .catch((error) => serverError(res, error));
  },

  updateBill(req, res) {
    // const messId = "111222";
    const { messId } = req.user;
    UserBillModel.findOne({ _id: messId })
      .then((mess) => {
        if (mess) {
          let billData;

          mess.userBill.filter((i) => {
            if (i._id == req.body._id) {
              return (billData = i);
            }
          });

          billData.rent = req.body.rent;
          billData.wifi = req.body.wifi;
          billData.homeMaid = req.body.homeMaid;
          billData.currentBill = req.body.currentBill;
          billData.mealBudget = req.body.mealBudget;

          mess.save();
          res.status(200).json({
            message: "Update Successfully",
          });
        } else {
          return resourceError(res, "Somthing went wrong");
        }
      })
      .catch((error) => serverError(res, error));
  },

  removeBill(req, res) {
    UserBillModel.updateMany(
      {},
      { $pull: { userBill: { _id: req.params._id } } }
    )
      .then((result) => {
        if (result.modifiedCount) {
          res.status(200).json({
            message: "Successfully Removed ",
            // Floors: response.data,
          });
          // res.send("Successfully Removed Apartment");
        } else {
          return resourceError(res, "Somthing went wrong");
        }
      })
      .catch((error) => serverError(res, error));
  },

  getAllUsers(req, res) {
    // const messId = "101";
    const { messId } = req.user;
    LoginDB.find({ messId })
      .then((users) => {
        if (users) {
          res.status(200).json(users);
        } else {
          return resourceError(res, "No User found");
        }
      })
      .catch((error) => serverError(res, error));
  },
};
