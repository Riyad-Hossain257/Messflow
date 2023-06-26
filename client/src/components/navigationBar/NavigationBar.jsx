import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './navigation.css';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { logout } from '../../redux/slices/auth';

const NavigationBar = () => {
  const [showManagerBoard, setShowManagerBoard] = useState(false);

  const { user: currentUser } = useSelector((state) => state.auth);
  // console.log(currentUser.type === undefined);
  const dispatch = useDispatch();
  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      setShowManagerBoard(currentUser.type.includes('manager'));
    } else {
      setShowManagerBoard(false);
    }

    // EventBus.on("logout", () => {
    //   logOut();
    // });

    // return () => {
    //   EventBus.remove("logout");
    // };
  }, [currentUser, logOut]);

  return (
    <>
      <Navbar
        className="sticky-top navbar navGlass "
        expand="md"
        collapseOnSelect="true"
      >
        <Container>
          <Navbar.Brand>
            <Link to="/" className="text-decoration-none">
              <b className="mess">Mess</b>
              <span className="factor">Flow</span>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="ms-auto my-lg-0" navbarScroll>
              <React.Fragment>
                {currentUser && (
                  <Nav.Link
                    eventKey="4"
                    as={Link}
                    to="/dashboard"
                    className="navLink"
                  >
                    Dashboard
                  </Nav.Link>
                )}

                {showManagerBoard && (
                  <Nav.Link
                    eventKey="2"
                    as={Link}
                    to="/manager"
                    className="navLink"
                  >
                    {/* <Link > */}
                    Manager
                    {/* </Link> */}
                  </Nav.Link>
                )}

                {currentUser ? (
                  <div className="navbar-nav ml-auto">
                    <Nav.Link
                      eventKey="5"
                      as={Link}
                      to="/profile"
                      className="navLink"
                    >
                      {/* <Link > */}
                      {currentUser.name}
                      {/* </Link> */}
                    </Nav.Link>

                    <Nav.Link
                      eventKey="6"
                      as={Link}
                      to="/"
                      className="navLink bg-danger text-white"
                      onClick={logOut}
                    >
                      {/* <Link > */}
                      LogOut
                      {/* </Link> */}
                    </Nav.Link>
                  </div>
                ) : null

                // <div className="navbar-nav ml-auto">
                //   <Nav.Link
                //     eventKey="7"
                //     as={Link}
                //     to="/login"
                //     className="navLink"
                //   >
                //     Login
                //   </Nav.Link>

                //   <Nav.Link
                //     eventKey="7"
                //     as={Link}
                //     to="/manRegister"
                //     className="navLink"
                //   >
                //     Manager Register
                //   </Nav.Link>
                //   <Nav.Link
                //     eventKey="7"
                //     as={Link}
                //     to="/userRegister"
                //     className="navLink"
                //   >
                //     User Register
                //   </Nav.Link>
                // </div>
                }
              </React.Fragment>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavigationBar;
