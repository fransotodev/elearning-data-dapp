import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";
function VisualizeButton({
  text,
  title,
  endpointDashboard,
  renderDownloadButton,
  index,
}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button className="btn btn-primary" onClick={handleShow}>
        {text}
      </button>

      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body centered>
          <iframe
            title={title}
            src={endpointDashboard}
            style={{
              //"padding-left": "15%",
              width: "100%",
              height: "400px",
            }}
          />
        </Modal.Body>
        <div className="container container-fluid ">
          <div className="row no-gutter mb-3 ">
            <div className="col">
              <button
                className="btn btn-secondary btn-block"
                onClick={handleClose}
              >
                Close
              </button>
            </div>
            <div className="col">{renderDownloadButton(index)}</div>
          </div>
        </div>
      </Modal>
    </>
  );
}

VisualizeButton.propTypes = {
  text: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  endpointDashboard: PropTypes.string.isRequired,
  renderDownloadButton: PropTypes.func.isRequired,
  index: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default VisualizeButton;
