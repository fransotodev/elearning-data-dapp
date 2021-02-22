import React, { useState } from "react";
import { Modal } from "react-bootstrap";

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

      <Modal centered size="lg" show={show} onHide={handleClose}>
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
          <div className="row no-gutter ">
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

export default VisualizeButton;
