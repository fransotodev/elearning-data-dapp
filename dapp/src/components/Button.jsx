import React from "react";

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

export default Button;
