import React from "react";
import StatusButton from "./common/StatusButton";
import ContractStatus from "./common/ContractStatus";
import PropTypes from "prop-types";

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
      <div className="jumbotron jumbotron-fluid bg-white">
        <ContractStatus color={color} contractStatus={contractStatus} />
        {renderStatusButtons()}
      </div>
    </>
  );
};

OwnerMenu.propTypes = {
  contractStatus: PropTypes.string.isRequired,
  handleButtonClick: PropTypes.func.isRequired,
};

export default OwnerMenu;
