import React from "react";
import PropTypes from "prop-types";
import { propTypes } from "react-bootstrap/esm/Image";

function Button({ index, onClick, text, className }) {
  return (
    <button
      className={`btn btn-primary ${className}`}
      onClick={() => onClick(index)}
    >
      {text}
    </button>
  );
}

Button.propTypes = {
  index: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  className: PropTypes.string
};

export default Button;
