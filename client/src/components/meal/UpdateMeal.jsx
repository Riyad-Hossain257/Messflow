import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { updateMeal } from '../../redux/slices/messSlice';

import { toast } from 'react-toastify';
import { reloadingOn, reloadingOff } from '../../redux/slices/reload';

const UpdateMeal = (props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { _id, morning, day, night } = props.data;
  const [initialValues, setInitialValues] = useState({
    _id: '',
    morning: 0,
    day: 0,
    night: 0,
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
    dispatch(updateMeal(initialValues))
      .then(() => {
        dispatch(reloadingOn());
        setLoading(false);
        toast.success('Successfully Updated');
        props.onHide(true);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    setTimeout(() => {
      setInitialValues({
        _id: _id,
        morning: morning,
        day: day,
        night: night,
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
                    type="number"
                    className="form-control noScroll"
                    id="floatingInput"
                    name="morning"
                    autoComplete="off"
                    value={initialValues.morning}
                    onChange={changeHandler}
                    placeholder="Morning"
                    required
                  />
                  <label for="floatingInput">Morning</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="number"
                    className="form-control noScroll"
                    id="floatingInput"
                    name="day"
                    autoComplete="off"
                    value={initialValues.day}
                    onChange={changeHandler}
                    placeholder="Day"
                  />
                  <label for="floatingInput">Day</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="number"
                    className="form-control noScroll"
                    id="floatingInput"
                    name="night"
                    autoComplete="off"
                    value={initialValues.night}
                    onChange={changeHandler}
                    placeholder="Night"
                    required
                  />
                  <label for="floatingInput">Night</label>
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

export default UpdateMeal;
