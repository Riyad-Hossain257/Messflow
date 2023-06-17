const ExpenseModel = require("../../Database/Model/ExpenseModel");

const { serverError, resourceError } = require("../../utils/error");

module.exports = {
  createExpense(req, res) {
    const { messId } = req.user;
    let { spender, expType, expAmount, date } = req.body;
    // const messId = "111222";
    // console.log(req.body);
    let objData = new Object({ spender, expType, expAmount, date });
    let expData = new ExpenseModel({
      _id: messId,
      expense: objData,
    });
    ExpenseModel.findOne({ _id: messId })
      .then((mess) => {
        if (mess) {
          mess.expense.push(objData);
          mess
            .save()
            .then((response) => {
              res.status(201).json({
                message: "Expense Created Successfully",
              });
            })
            .catch((error) => serverError(res, error));
        } else {
          // return resourceError(res, "Please create mess first!");
          expData
            .save()
            .then((response) => {
              res.status(201).json({
                message: "Expense Created Successfully",
              });
            })
            .catch((error) => serverError(res, error));
        }
      })
      .catch((error) => {
        serverError(res, error);
      });
  },

  getMonthlyExpense(req, res) {
    // let { _id, role, homeId, homeOwner } = req.user;
    // const messId = "111222";
    const { messId } = req.user;
    ExpenseModel.findOne({ _id: messId })
      .then((result) => {
        if (result != null) {
          if (result.expense.length != 0) {
            let monthlyData = [];
            result.expense.filter((i) => {
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
            return resourceError(res, "No data Found");
          }
        } else {
          return resourceError(res, "No data found");
        }
      })
      .catch((error) => serverError(res, error));
  },

  getMonthlyTotalExpense(req, res) {
    // let { _id, role, homeId, homeOwner } = req.user;
    const messId = "111222";
    ExpenseModel.findOne({ _id: messId })
      .then((result) => {
        if (result != null) {
          if (result.expense.length != 0) {
            let monthlyData = [];
            result.expense.filter((i) => {
              if (
                new Date(i.date).getMonth() + 1 ===
                  parseInt(req.params.month) &&
                new Date(i.date).getFullYear() === parseInt(req.params.year)
              ) {
                return monthlyData.push(i);
              }
            });

            let totalExpense = 0;
            for (let i = 0; i < monthlyData.length; i++) {
              totalExpense += monthlyData[i].expAmount;
            }

            res.status(200).json(totalExpense);
          } else {
            return resourceError(res, "No data Found");
          }
        } else {
          return resourceError(res, "No data found");
        }
      })
      .catch((error) => serverError(res, error));
  },

  updateExpense(req, res) {
    // const messId = "111222";
    const { messId } = req.user;
    ExpenseModel.findOne({ _id: messId })
      .then((mess) => {
        if (mess) {
          let expData;

          mess.expense.filter((i) => {
            if (i._id == req.body._id) {
              return (expData = i);
            }
          });
          expData.spender = req.body.spender;
          expData.expType = req.body.expType;
          expData.expAmount = req.body.expAmount;

          mess.save();
          // console.log(apartmentData.rent);
          res.status(200).json({
            message: "Update Successfully",
            // Floors: response.data,
          });
          // res.send(apartmentData);
        } else {
          return resourceError(res, "Somthing went wrong");
        }
      })
      .catch((error) => serverError(res, error));
  },

  removeExpense(req, res) {
    ExpenseModel.updateMany(
      {},
      { $pull: { expense: { _id: req.params.expId } } }
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
};
