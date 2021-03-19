import React from "react";
import PropTypes from "prop-types";

const StatusButton = ({ type, text, color, current, onClick }) => {
  const buttonDisabled = current ? "disabled" : "";
  return (
    <div className="col-md mb-1">
      <button
        className={`btn btn-block btn-${color} ${buttonDisabled}`}
        onClick={() => (current ? null : onClick(type))}
      >
        <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
          <div className="col p-4 d-flex flex-column position-static"></div>
          <div className="container">
            <h1 className="mb-4" style={{ textAlign: "center" }}>
              <strong>{text}</strong>
            </h1>
            <h3 className="mb-4" style={{ textAlign: "center" }}>
              <strong>{current ? "(current)" : "_"} </strong>
            </h3>
          </div>
        </div>
      </button>
    </div>
  );
};

StatusButton.propTypes = {
  type: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  current: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default StatusButton;
