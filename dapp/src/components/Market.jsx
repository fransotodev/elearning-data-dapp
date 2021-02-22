import React from "react";
import OfferTable from "./common/OfferTable";

import Button from "./Button";

function Market({ marketOffers, purchasedOffers, handleBuyButtonClick }) {
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
      name: "Description",
      path: "description",
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
    <React.Fragment>
      <OfferTable columns={columns} data={marketOffers} />
    </React.Fragment>
  );
}

export default Market;
