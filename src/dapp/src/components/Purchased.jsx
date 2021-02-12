import React from "react";
import OfferTable from "./common/OfferTable";

//Obtain only purchased offers for a given account
//Create columns and data like in Market component
//Render a OfferTable component with these columns and data

function Purchased({ purchasedOffers }) {
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
      name: "Endpoint",
      path: "endpointDashboard",
    },
    {
      name: "Auth",
      path: "authorizationHeader",
    },
  ];
  console.log(purchasedOffers);
  return (
    <React.Fragment>
      <OfferTable columns={columns} data={purchasedOffers} />
    </React.Fragment>
  );
}

export default Purchased;
