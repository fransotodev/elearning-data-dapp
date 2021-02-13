import React from "react";

function Button({ index, onClick, text }) {
  return (
    <button className="btn btn-primary" onClick={() => onClick(index)}>
      {text}
    </button>
  );
}

export default Button;
