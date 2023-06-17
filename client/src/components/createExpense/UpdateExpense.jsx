import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { updateExpense } from "../../redux/slices/messSlice";
import { reloadingOn, reloadingOff } from "../../redux/slices/reload";

const UpdateExpense = (props) => {
  const { _id, spender, expType, expAmount } = props.data;
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [initialValues, setInitialValues] = useState({
    _id: "",
    spender: "",
    expType: "",
    expAmount: "",
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
    setLoading(true);
    dispatch(reloadingOff());
    dispatch(updateExpense(initialValues))
      .then(() => {
        setLoading(false);
        dispatch(reloadingOn());
        props.onHide(true);
      })
      .catch(() => setLoading(true));
  };
  useEffect(() => {
    setInitialValues({
      _id: _id,
      spender: spender,
      expType: expType,
      expAmount: expAmount,
    });
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
          Give all information
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
                    name="spender"
                    autoComplete="off"
                    value={initialValues.spender}
                    onChange={changeHandler}
                    placeholder="Spender"
                    required
                  />
                  <label for="floatingInput">Spender</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    name="expType"
                    autoComplete="off"
                    value={initialValues.expType}
                    onChange={changeHandler}
                    placeholder="Expense Type"
                  />
                  <label for="floatingInput">Expense Type</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    name="expAmount"
                    autoComplete="off"
                    value={initialValues.expAmount}
                    onChange={changeHandler}
                    placeholder="Expense Amount"
                    required
                  />
                  <label for="floatingInput">Expense Amount</label>
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

export default UpdateExpense;
