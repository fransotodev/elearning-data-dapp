import React from "react";
import StatusButton from "./common/StatusButton";
const OwnerMenu = ({ contractStatus, handleButtonClick }) => {
  const mappingTypes = {
    Active: "success",
    OnlyQueries: "warning",
    Stopped: "danger",
  };

  const mappingText = {
    Active: "ACTIVATE",
    OnlyQueries: "QUERIES ONLY",
    Stopped: "STOP",
  };

  let color = mappingTypes[contractStatus] || "dark";
  function renderStatusButtons() {
    return (
      <div className="row ">
        {Object.keys(mappingTypes).map((type) => (
          <StatusButton
            key={type}
            type={type}
            text={mappingText[type]}
            color={mappingTypes[type]}
            current={type === contractStatus}
            onClick={handleButtonClick}
          />
        ))}
      </div>
    );
  }
  return (
    <>
      <div className="jumbotron jumbotron-fluid bg-light">
        <div className="container text-center">
          <h1>
            <strong>Contract Status: </strong>
            <span className={` mb-5 badge badge-${color}`}>
              {contractStatus === "OnlyQueries"
                ? "Queries Only"
                : contractStatus}
            </span>
          </h1>
        </div>
        {renderStatusButtons()}
      </div>
    </>
  );
};

export default OwnerMenu;
