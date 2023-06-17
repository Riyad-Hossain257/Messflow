import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { removeUser } from "../../redux/slices/messSlice";

import { toast } from "react-toastify";

function FindUserDetails(props) {
  const dispatch = useDispatch();

  const { messInfo, allusers } = useSelector((state) => state.mess);

  const [openProfileModal, setOpenProfileModal] = React.useState(false);
  const [renterDetails, setRenterDetails] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const showProfileModal = () => {
    setOpenProfileModal(true);
    setLoading(false);
  };
  const onSubmit = (e) => {
    let user = JSON.parse(e.userData);
    setLoading(true);
    dispatch(removeUser(user._id))
      .then(() => {
        setLoading(false);
        toast.success("Successfully Removed");
        props.onHide(true);
      })
      .catch(setLoading(false));
    // dispatch(getProfileDetails(user._id))
    //   .unwrap()
    //   .then((result) => {
    //     setRenterDetails(result);
    //     setLoading(false);
    //   })
    //   .catch((err) => setLoading(false))
    //   .finally(() => showProfileModal());
    // props.onHide(true);
  };

  return (
    <div>
      {/* <RenterProfileModal
        show={openProfileModal}
        onHide={() => setOpenProfileModal(false)}
        userData={renterDetails}
      /> */}
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Find</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Select  User */}
          <div className="mx-5">
            <div className="row ">
              <div className="col-md-12">
                <form onSubmit={handleSubmit(onSubmit)}>
                  {allusers ? (
                    <>
                      <div className="form-floating mb-3">
                        <select
                          className="form-select"
                          id="floatingSelect"
                          name="userData"
                          {...register("userData", { required: true })}
                        >
                          <option selected value="">
                            Select User
                          </option>

                          {allusers.map((option, index) => (
                            <option key={index} value={JSON.stringify(option)}>
                              &#128100; {option.name} &#x27AA; &#x27AA;
                              &#128222; {option._id}
                            </option>
                          ))}
                        </select>
                        <label for="floatingSelect">Users</label>
                        {errors.userData && (
                          <span className="text-danger d-block">
                            This field is required
                          </span>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      <h2>wait....</h2>
                    </>
                  )}
                </form>

                <div className="d-flex justify-content-around">
                  <button
                    type="submit"
                    onClick={handleSubmit(onSubmit)}
                    className="btn btn-danger btn-block"
                    disabled={loading}
                  >
                    {loading && (
                      <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span>Remove</span>
                  </button>

                  <button
                    type="submit"
                    // onClick={handleSubmit(onSubmit)}
                    className="btn btn-outline-warning btn-block"
                    disabled={loading}
                  >
                    {loading && (
                      <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span>Upgrade Manager</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default FindUserDetails;
