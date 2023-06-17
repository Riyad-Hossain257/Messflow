import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { removeBill } from "../../redux/slices/messSlice";
import { reloadingOff, reloadingOn } from "../../redux/slices/reload";

const Confirmation = (props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const handleConfirm = () => {
    dispatch(reloadingOff());
    setLoading(true);
    switch (props.pop_up_type) {
      case "Remove":
        dispatch(removeBill(props.data))
          .then(() => {
            dispatch(reloadingOn());
            setLoading(false);
            props.onHide(false);
          })
          .catch(() => setLoading(true));

        break;
      case "Create":
        // dispatch(removeRenter(props.data));
        // props.onHide(false);
        break;
    }
  };

  return (
    <>
      <Modal
        {...props}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {props.data ? (
          <>
            {props.pop_up_type === "Remove" ? (
              <>
                <Modal.Header closeButton>
                  <Modal.Title> Are you sure? </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="alert alert-danger" role="alert">
                    Do you really want to {props.pop_up_type}? After removing it
                    cannot be undone.
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={() => props.onHide(false)}
                  >
                    Close
                  </Button>

                  <button
                    type="submit"
                    className="btn btn-danger"
                    disabled={loading}
                    onClick={() => handleConfirm()}
                  >
                    {loading && (
                      <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span>Remove</span>
                  </button>
                </Modal.Footer>
              </>
            ) : props.pop_up_type === "Create" ? (
              <>
                <Modal.Header closeButton>
                  <Modal.Title> Are you sure? </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="alert alert-warning" role="alert">
                    Do you really want to {props.pop_up_type}? After{" "}
                    {props.pop_up_type}, it cannot be undone.
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={() => props.onHide(false)}
                  >
                    Close
                  </Button>

                  <button
                    type="submit"
                    className="btn btn-warning"
                    disabled={loading}
                    onClick={() => handleConfirm()}
                  >
                    {loading && (
                      <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span>Confirm</span>
                  </button>
                </Modal.Footer>
              </>
            ) : null}
          </>
        ) : (
          <>
            <h1>Please wait...</h1>
          </>
        )}
      </Modal>
    </>
  );
};

export default Confirmation;
