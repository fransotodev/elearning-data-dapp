import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import DataScreen from "./common/DataScreen";

function Market({ marketOffers, handleBuyButtonClick }) {
  const columns = [
    {
      name: "Statements",
      path: "numStatements",
      content: (data) => (
        <h3>
          <strong>{data.numStatements}</strong>
        </h3>
      ),
    },
    {
      name: "Keywords",
      path: "description", //Inside the blockchain the name is "description"
    },
    {
      name: "Date",
      path: "date",
    },
    {
      name: "Price",
      path: "price",
    },
    {
      name: "",
      path: "",
      content: (data) => {
        return (
          <Button
            index={data.index}
            onClick={handleBuyButtonClick}
            text={"BUY"}
          />
        );
      },
    },
  ];

  return (
    <div className="container">
      <DataScreen offers={marketOffers} columns={columns} />
    </div>
  );
}

Market.propTypes = {
  marketOffers: PropTypes.array.isRequired,
  handleBuyButtonClick: PropTypes.func.isRequired,
};

export default Market;
