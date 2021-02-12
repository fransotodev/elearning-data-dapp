import React, { Component } from "react";
import OfferTable from "./common/OfferTable";

import BuyButton from "./BuyButton";

function Market({ marketOffers, purchasedOffers, handleBuyButtonClick }) {
  const columns = [
    {
      name: "Statements",
      path: "numStatements",
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
        return <BuyButton index={data.index} onClick={handleBuyButtonClick} />;
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
