import React from "react";

function BuyButton({ index, onClick }) {
  return (
    <button className="btn btn-primary" onClick={() => onClick(index)}>
      BUY
    </button>
  );
}

export default BuyButton;
