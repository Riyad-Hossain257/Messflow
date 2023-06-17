const MessInfo = require("../../Database/Model/MessInfoModel");
const LoginDB = require("../../Database/Model/LoginModel");

const { serverError, resourceError } = require("../../utils/error");

module.exports = {
  createMess(req, res) {
    let { messId, messName, totalSeats, perSeatRent, homeMaid, wifi } =
      req.body;
    const { _id } = req.user;
    // let objData = new Object({
    //   perSeatRent,
    //   homeMaid,
    //   wifi,
    // });
    let messData = new MessInfo({
      //   managerId: userId,
      _id: messId,
      messName,
      totalSeats,
      perSeatRent,
      homeMaid,
      wifi,
      currentBill: 0,
      // },
    });
    MessInfo.findOne({ _id: messId })
      .then((mess) => {
        if (!mess) {
          messData
            .save()
            .then((response) => {
              LoginDB.findOneAndUpdate(
                { _id: _id },
                { $set: { messId: messId } },
                { new: true }
              )
                .then((result) => {
                  if (result) {
                    res.status(201).json({
                      message: "Mess Created Successfully",
                    });
                  } else {
                    return resourceError(res, "Something went wrong!");
                  }
                })
                .catch((error) => serverError(res, error));
            })
            .catch((error) => serverError(res, error));
        } else {
          return resourceError(res, "Mess Already Created!");
        }
      })
      .catch((error) => {
        serverError(res, error);
      });
  },

  getAllInfo(req, res) {
    // const messId = "124";
    const { messId } = req.user;
    MessInfo.findOne({ _id: messId })
      .then((mess) => {
        if (mess) {
          res.status(200).json(mess);
        } else {
          return resourceError(res, "Mess Not Found!");
        }
      })
      .catch((error) => serverError(res, error));
  },

  updateMess(req, res) {
    // let { messId } = req.params;
    const { messId } = req.user;
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

  removeMess(req, res) {
    // let { messId } = req.params;
    const messId = "124";
    MessInfo.findOneAndDelete({ _id: messId })
      .then((result) => {
        res.status(200).json({
          message: "Delete successfully",
        });
      })
      .catch((error) => serverError(res, error));
  },
  removeUser(req, res) {
    let { _id } = req.params;
    // const messId = "124";
    LoginDB.findOneAndDelete({ _id })
      .then((result) => {
        res.status(200).json({
          message: "Delete successfully",
        });
      })
      .catch((error) => serverError(res, error));
  },
};
