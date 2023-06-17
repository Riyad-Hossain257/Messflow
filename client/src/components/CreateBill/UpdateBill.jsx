import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { updateBill } from "../../redux/slices/messSlice";

import { toast } from "react-toastify";
import { reloadingOn, reloadingOff } from "../../redux/slices/reload";

const UpdateBill = (props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { _id, rent, wifi, homeMaid, currentBill, mealBudget } = props.data;
  const [initialValues, setInitialValues] = useState({
    _id: "",
    rent: 0,
    wifi: 0,
    homeMaid: 0,
    currentBill: 0,
    mealBudget: 0,
  });

  const changeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInitialValues({
      ...initialValues,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(reloadingOff());
    setLoading(true);
    dispatch(updateBill(initialValues))
      .then(() => {
        dispatch(reloadingOn());
        setLoading(false);
        toast.success("Successfully updated");
        props.onHide(true);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    setTimeout(() => {
      setInitialValues({
        _id: _id,
        rent: rent,
        wifi: wifi,
        homeMaid: homeMaid,
        currentBill: currentBill,
        mealBudget: mealBudget,
      });
    }, 1000);
  }, [props.data]);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Give all information needed below
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mx-5 ">
          <div className="row ">
            <div className="col-md-12">
              <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    name="rent"
                    autoComplete="off"
                    value={initialValues.rent}
                    onChange={changeHandler}
                    placeholder="Rent"
                    required
                  />
                  <label for="floatingInput">Rent</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    name="wifi"
                    autoComplete="off"
                    value={initialValues.wifi}
                    onChange={changeHandler}
                    placeholder="wifi"
                  />
                  <label for="floatingInput">Wifi</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    name="currentBill"
                    autoComplete="off"
                    value={initialValues.currentBill}
                    onChange={changeHandler}
                    placeholder="Enter your currentBill"
                    required
                  />
                  <label for="floatingInput">Current Bill</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    name="homeMaid"
                    autoComplete="off"
                    value={initialValues.homeMaid}
                    onChange={changeHandler}
                    placeholder="Enter homeMaid"
                  />
                  <label for="floatingInput">Home Maid</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    name="mealBudget"
                    autoComplete="off"
                    value={initialValues.mealBudget}
                    onChange={changeHandler}
                    placeholder="Enter mealBudget"
                  />
                  <label for="floatingInput">Meal Budget</label>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>Submit</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateBill;
