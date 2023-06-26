import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Navigate, Route, Routes } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';

import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { login } from '../../redux/slices/auth';
import { clearMessage } from '../../redux/slices/message';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const history = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('This field is required!'),
    password: Yup.string().required('This field is required!'),
  });

  const handleLogin = (formValue) => {
    setLoading(true);

    dispatch(login(formValue))
      .unwrap()
      .then(() => {
        toast.success('Successfully loged in');
        history('/dashboard');
        setLoading(false);
        // window.location.reload();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  if (isLoggedIn) {
    return (
      <Routes>
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    );
  }

  return (
    <>
      {message && (
        <div className="form-group">
          <div className="alert alert-danger" role="alert">
            {message}
          </div>
        </div>
      )}
      <h5 className="text-center color ">Login</h5>
      <div
        style={{ height: 'cal(100vh-500px)' }}
        className="container  d-flex align-item-center justify-content-center"
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          <Form>
            <div className="row ">
              <div className="col-12 d-flex justify-content-center flex-column">
                <div className="form-group mb-1">
                  <Field
                    name="email"
                    type="text"
                    placeholder="Enter Your Email "
                    className="form-control"
                    autoComplete="off"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group mb-3">
                  <Field
                    name="password"
                    type="password"
                    placeholder="Password "
                    className="form-control"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <button
                  type="submit"
                  className="btn  btn-primary btn-block fa-lg gradient-custom-2"
                  disabled={loading}
                >
                  {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>Login</span>
                </button>
              </div>
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default Login;
