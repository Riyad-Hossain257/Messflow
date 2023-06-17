import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';

import { toast } from 'react-toastify';
import { createExpense } from '../../redux/slices/messSlice';
import { clearMessage } from '../../redux/slices/message';
import { reloadingOn, reloadingOff } from '../../redux/slices/reload';

const CreateExpense = (props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const { message } = useSelector((state) => state.message);
  const initialValues = {
    date: '',
    expType: '',
    expAmount: 0,
    spender: '',
  };

  const validationSchema = Yup.object().shape({
    date: Yup.date().required('This field is required!'),
    expType: Yup.string().required('This field is required!'),
    expAmount: Yup.number().required('This field is required!'),
    spender: Yup.string().required('This field is required!'),
  });

  const handleSubmit = (formValue) => {
    setLoading(true);
    dispatch(reloadingOff());
    dispatch(createExpense(formValue))
      .then(() => {
        setLoading(false);
        dispatch(reloadingOn());
        toast.success('Successfully created');
        props.onHide(true);
      })
      .catch(() => setLoading(true));
  };

  useEffect(() => {
    dispatch(clearMessage());
    dispatch(reloadingOff());
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
          Give all information
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
              <label>Date</label>
              <Field
                type="datetime-local"
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
              <label>Name</label>
              <Field
                type="text"
                placeholder="spender's name"
                name="spender"
                className="form-control"
                autoComplete="off"
              />
              <ErrorMessage
                name="spender"
                component="div"
                className="alert alert-danger"
              />
            </div>

            <div className="form-group mb-3">
              <label>Type</label>
              <Field
                type="text"
                placeholder="Expense type"
                name="expType"
                className="form-control"
                autoComplete="off"
              />
              <ErrorMessage
                name="expType"
                component="div"
                className="alert alert-danger"
              />
            </div>

            <div className="form-group mb-3">
              <label>Amount</label>
              <Field
                type="number"
                placeholder="enter total expense"
                name="expAmount"
                className="form-control noScroll"
                autoComplete="off"
              />
              <ErrorMessage
                name="expAmount"
                component="div"
                className="alert alert-danger"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Create</span>
            </button>
          </Form>
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default CreateExpense;
