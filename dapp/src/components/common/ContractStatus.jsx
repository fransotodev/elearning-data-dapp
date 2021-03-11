import React from "react";

const ContractStatus = ({ color, contractStatus }) => {
  return (
    <div className="container text-center">
      <h1>
        <strong>Contract Status: </strong>
        <span className={` mb-5 badge badge-${color}`}>
          {contractStatus === "OnlyQueries" ? "Queries Only" : contractStatus}
        </span>
      </h1>{" "}
    </div>
  );
};

export default ContractStatus;
