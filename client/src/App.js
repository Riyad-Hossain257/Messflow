import { BrowserRouter, Routes, Navigate, Route } from 'react-router-dom';
import './app.css';
import React from 'react';
import NavigationBar from './components/navigationBar/NavigationBar';
import Profile from './pages/profile/Profile';
import Manager from './pages/manager/Manager';
import AuthVerify from './common/AuthVerify';
import { logout } from './redux/slices/auth';
import { useDispatch, useSelector } from 'react-redux';
import ManagerRegistration from './pages/Registration&Login/ManagerRegistration';
import Login from './pages/Registration&Login/Login';
import Dashboard from './pages/dashboard/Dashboard';
import Home from './pages/home/Home';

import 'react-datepicker/dist/react-datepicker.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserRegistration from './pages/Registration&Login/UserRegistration';

function App() {
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const logOut = () => {
    dispatch(logout());
  };
  return (
    <>
      <div>
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
      <BrowserRouter>
        <NavigationBar />
        <Routes>
          {isLoggedIn ? (
            <>
              {/* <Route path="/" element={<Home />} /> */}
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/dashboard" element={<Dashboard />} />
              {user.type === 'manager' ? (
                <>
                  <Route path="/manager" element={<Manager />} />
                </>
              ) : (
                <></>
              )}
              <Route
                path="*"
                // element={
                //   <main style={{ padding: "1rem" }}>
                //     <p>There's nothing here!</p>
                //   </main>
                // }
                element={<Navigate to="/dashboard" replace />}
              />
            </>
          ) : (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/manRegister" element={<ManagerRegistration />} />
              <Route path="/userRegister" element={<UserRegistration />} />
              <Route
                path="*"
                // element={
                //   <main style={{ padding: "1rem" }}>
                //     <p>There's nothing here!</p>
                //   </main>
                // }
                element={<Navigate to="/" replace />}
              />
            </>
          )}
        </Routes>
        <AuthVerify logOut={logOut} />
      </BrowserRouter>
    </>
  );
}

export default App;
