import React from "react";
import Button from "./Button";
import OfferTable from "./common/OfferTable";

//Obtain only purchased offers for a given account
//Create columns and data like in Market component
//Render a OfferTable component with these columns and data

function Purchased({ purchasedOffers, handleDownloadDataButtonClick }) {
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
      name: "Download Data",
      path: "",
      content: (data) => (
        <Button
          index={data.index}
          onClick={handleDownloadDataButtonClick}
          text={"Download"}
        />
      ),
    },
    //{
    //  name: "Auth",
    //  path: "authorizationHeader",
    //},
  ];
  return (
    <React.Fragment>
      <OfferTable columns={columns} data={purchasedOffers} />
    </React.Fragment>
  );
}

export default Purchased;
