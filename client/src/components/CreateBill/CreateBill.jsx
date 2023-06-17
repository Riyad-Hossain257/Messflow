import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { createBill, getUser } from '../../redux/slices/messSlice';
import { reloadingOn, reloadingOff } from '../../redux/slices/reload';

import { toast } from 'react-toastify';

const CreateBill = (props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { messInfo, allusers } = useSelector((state) => state.mess);

  const [initialValues, setInitialValues] = useState({
    date: '',
    user: '',
    rent: 0,
    wifi: 0,
    homeMaid: 0,
    currentBill: 0,
    mealBudget: 0,
  });

  const validationSchema = Yup.object().shape({
    date: Yup.date().required('This field is required!'),
    user: Yup.string().required('This field is required!'),
  });

  const handleSubmit = (formValue) => {
    dispatch(reloadingOff());
    setLoading(true);
    const userData = JSON.parse(formValue.user);

    const billData = {
      userId: userData._id,
      userName: userData.name,
      rent: formValue.rent,
      mealBudget: formValue.mealBudget,
      homeMaid: formValue.homeMaid,
      currentBill: formValue.currentBill,
      wifi: formValue.wifi,
      date: formValue.date,
    };
    dispatch(createBill(billData))
      .then(() => {
        setLoading(false);
        dispatch(reloadingOn());
        toast.success('Successfully created');
        props.onHide(true);
      })
      .catch(() => setLoading(true));
  };

  useEffect(() => {
    dispatch(getUser());
    setInitialValues({
      date: '',
      user: '',
      rent: messInfo.perSeatRent,
      wifi: messInfo.wifi,
      homeMaid: messInfo.homeMaid,
      currentBill: messInfo.currentBill,
      mealBudget: 0,
    });
  }, []);

  useEffect(() => {
    setInitialValues({
      date: '',
      user: '',
      rent: messInfo.perSeatRent,
      wifi: messInfo.wifi,
      homeMaid: messInfo.homeMaid,
      currentBill: messInfo.currentBill,
      mealBudget: 0,
    });
  }, [messInfo]);

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
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="form-group mb-3">
              <label>Date</label>
              <Field
                type="date"
                placeholder="Enter Date"
                name="date"
                className="form-control"
              />
              <ErrorMessage
                name="date"
                component="div"
                className="alert alert-danger"
              />
            </div>

            <div className="form-group mb-3">
              <label>Users</label>
              <Field as="select" name="user" className="form-control">
                <option selected value="">
                  Select user
                </option>
                {allusers.map((option, index) => (
                  <>
                    <option key={index} value={JSON.stringify(option)}>
                      &#128100; {option.name} &#x27AA; &#x27AA; &#128222;{' '}
                      {option.phone}
                    </option>
                  </>
                ))}
              </Field>
              <ErrorMessage
                name="user"
                component="div"
                className="alert alert-danger"
              />
            </div>

            <div className="form-group mb-3">
              <label>Rent</label>
              <Field
                type="number"
                placeholder="enter rent"
                name="rent"
                className="form-control noScroll"
              />
              <ErrorMessage
                name="rent"
                component="div"
                className="alert alert-danger"
              />
            </div>
            <div className="form-group mb-3">
              <label>Wifi</label>
              <Field
                type="number"
                placeholder="enter wifi"
                name="wifi"
                className="form-control noScroll"
              />
              <ErrorMessage
                name="wifi"
                component="div"
                className="alert alert-danger"
              />
            </div>
            <div className="form-group mb-3">
              <label>Electricity Bill</label>
              <Field
                type="number"
                placeholder="enter electricity bill"
                name="currentBill"
                className="form-control noScroll"
              />
              <ErrorMessage
                name="currentBill"
                component="div"
                className="alert alert-danger"
              />
            </div>

            <div className="form-group mb-3">
              <label>Home Maid</label>
              <Field
                type="number"
                placeholder="enter home maid bill"
                name="homeMaid"
                className="form-control noScroll"
              />
              <ErrorMessage
                name="homeMaid"
                component="div"
                className="alert alert-danger"
              />
            </div>
            <div className="form-group mb-3">
              <label>Meal Budget</label>
              <Field
                type="number"
                placeholder="enter meal budget"
                name="mealBudget"
                className="form-control noScroll"
              />
              <ErrorMessage
                name="mealBudget"
                component="div"
                className="alert alert-danger"
              />
            </div>

            {/* <input type="submit" className="btn btn-primary" value="Submit" /
             */}
            <button
              type="submit"
              className="btn btn-success"
              disabled={loading}
            >
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Submit</span>
            </button>
          </Form>
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default CreateBill;
