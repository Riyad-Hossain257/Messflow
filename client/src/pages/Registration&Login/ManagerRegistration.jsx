import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { managerRegister } from '../../redux/slices/auth';
import { clearMessage } from '../../redux/slices/message';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
// import "react-toastify/dist/ReactToastify.css";
import { validationSchema } from '../../validation/ManagerReg';
import { Link } from 'react-router-dom';

const ManagerRegistration = () => {
  const [loading, setLoading] = useState(false);

  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const initialValues = {
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const handleRegister = (formValue, { resetForm }) => {
    setLoading(true);

    dispatch(managerRegister(formValue))
      .unwrap()
      .then(() => {
        setLoading(false);
        toast.success('Successfully registered!');

        resetForm();
        navigate('/login');
        dispatch(clearMessage());
      })
      .catch(() => {
        setLoading(true);
      });
  };

  return (
    <>
      {message && (
        <div className="form-group">
          <div className="alert alert-danger" role="alert">
            {message}
          </div>
        </div>
      )}
      <h3 className="text-center m-4 color">Manager Registration</h3>
      <div className="container d-flex align-item-center justify-content-center">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
        >
          <Form>
            <div className="row register-form">
              <div className="col-12">
                <div className="form-group mb-2">
                  <Field
                    name="name"
                    type="text"
                    className="form-control"
                    placeholder="Name "
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group mb-2">
                  <Field
                    name="email"
                    type="email"
                    className="form-control"
                    placeholder="Email "
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>
                <div className="form-group mb-2">
                  <Field
                    name="phone"
                    type="number"
                    className="form-control noScroll"
                    placeholder="Phone "
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="form-group mb-2">
                  <Field
                    name="password"
                    type="password"
                    className="form-control"
                    placeholder="Password "
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>
                <div className="form-group mb-2">
                  <Field
                    name="confirmPassword"
                    type="password"
                    className="form-control"
                    placeholder="Confirm Password "
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-block fa-lg gradient-custom-2"
                  disabled={loading}
                >
                  {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>Register</span>
                </button>
              </div>
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default ManagerRegistration;
