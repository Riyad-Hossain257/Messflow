import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { updateMessInfo } from '../../redux/slices/messSlice';
import { reloadingOn, reloadingOff } from '../../redux/slices/reload';
import { clearMessage } from '../../redux/slices/message';

const UpdateMess = (props) => {
  const [loading, setLoading] = useState(false);

  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  const [initialValues, setInitialValues] = useState({
    messId: '',
    messName: '',
    totalSeats: '',
    perSeatRent: '',
    homeMaid: '',
    wifi: '',
    currentBill: 0,
  });

  const validationSchema = Yup.object().shape({
    messId: Yup.string().required('This field is required!'),
    messName: Yup.string().required('This field is required!'),
    totalSeats: Yup.number().required('This field is required!'),
    perSeatRent: Yup.number().required('This field is required!'),
    homeMaid: Yup.number().required('This field is required!'),
    wifi: Yup.number().required('This field is required!'),
  });

  const handleSubmit = (formValue) => {
    setLoading(true);
    dispatch(reloadingOff());
    dispatch(updateMessInfo(formValue))
      .then(() => {
        setLoading(false);
        dispatch(reloadingOn());
        toast.success('Successfully updated info');
        props.onHide(true);
      })
      .catch(() => setLoading(true));
  };
  useEffect(() => {
    setInitialValues({
      messId: props.data._id,
      messName: props.data.messName,
      totalSeats: props.data.totalSeats,
      perSeatRent: props.data.perSeatRent,
      homeMaid: props.data.homeMaid,
      wifi: props.data.wifi,
      currentBill: props.data.currentBill,
    });
  }, [props]);
  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

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
        {message && (
          <div className="form-group">
            <div className="alert alert-danger" role="alert">
              {message}
            </div>
          </div>
        )}

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="form-group mb-3">
              <label>Mess ID</label>
              <Field
                type="text"
                placeholder="Enter your messID"
                name="messId"
                className="form-control"
                disabled
              />
              <ErrorMessage
                name="messId"
                component="div"
                className="alert alert-danger"
              />
            </div>

            <div className="form-group mb-3">
              <label>Mess Name</label>
              <Field
                type="text"
                placeholder="Enter your messName"
                name="messName"
                className="form-control"
              />
              <ErrorMessage
                name="messName"
                component="div"
                className="alert alert-danger"
              />
            </div>

            <div className="form-group mb-3">
              <label>Total Seats</label>
              <Field
                type="number"
                placeholder="enter total seats"
                name="totalSeats"
                className="form-control noScroll"
              />
              <ErrorMessage
                name="totalSeats"
                component="div"
                className="alert alert-danger"
              />
            </div>

            <div className="form-group mb-3">
              <label>Per seat rent</label>
              <Field
                type="number"
                placeholder="enter per seat rent"
                name="perSeatRent"
                className="form-control noScroll"
              />
              <ErrorMessage
                name="perSeatRent"
                component="div"
                className="alert alert-danger"
              />
            </div>

            <div className="form-group mb-3">
              <label>Home maid bill</label>
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
              <label>Wifi</label>
              <Field
                type="number"
                placeholder="enter wifi bill"
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
              <label>Per User Elecrticity Bill</label>
              <Field
                type="number"
                placeholder="Per User Elecrticity Bill"
                name="currentBill"
                className="form-control noScroll"
              />
              <ErrorMessage
                name="currentBill"
                component="div"
                className="alert alert-danger"
              />
            </div>
            {/* <input type="submit" className="btn btn-primary" value="Submit" /> */}
            <button
              type="submit"
              className="btn btn-primary btn-block fa-lg gradient-custom-2"
              disabled={loading}
            >
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Update</span>
            </button>
          </Form>
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateMess;
