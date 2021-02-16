import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Button from "./Button";
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
  console.log(endpointDashboard);
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
        <button className="btn btn-secondary" onClick={handleClose}>
          Close
        </button>

        {renderDownloadButton(index)}
      </Modal>
    </>
  );
}

export default VisualizeButton;

/*

*/
