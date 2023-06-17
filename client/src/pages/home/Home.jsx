import React from 'react';
import logo from '../../img/logo.png';
import './home.css';
import Login from '../Registration&Login/Login';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <section className="gradient-form ">
        <div className="container  py-1">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-xl-10">
              <div className=" rounded-3 text-dark bg-transparent">
                <div className="row g-0">
                  <div className="col">
                    <div className="card-body ">
                      <div className="text-center">
                        <img src={logo} alt="logo" height="120px" />
                      </div>

                      <Login />

                      <div className="d-flex gap-2 align-items-center justify-content-center pb-4 mt-5">
                        <Link
                          to="/userRegister"
                          className="text-decoration-none"
                        >
                          Get in an existing mess?
                        </Link>
                        <Link
                          to="/manRegister"
                          className="text-decoration-none"
                        >
                          Create a new mess?
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
