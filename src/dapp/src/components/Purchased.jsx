import React from "react";
import Button from "./Button";
import OfferTable from "./common/OfferTable";
import VisualizeButton from "./VisualizeButton";
//Obtain only purchased offers for a given account
//Create columns and data like in Market component
//Render a OfferTable component with these columns and data

function Purchased({
  purchasedOffers,
  handleDownloadDataButtonClick,
  endpointDashboard,
}) {
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
    {
      name: "Visualize",
      path: "",
      content: (data) => (
        <VisualizeButton
          title={"Data Visualization"}
          text={"Visualize"}
          endpointDashboard={data.endpointDashboard}
          index={data.index}
          renderDownloadButton={(index) => (
            <Button
              index={index}
              onClick={handleDownloadDataButtonClick}
              text={"Download"}
            />
          )}
        />
      ),
    },
  ];
  return (
    <React.Fragment>
      <OfferTable columns={columns} data={purchasedOffers} />
    </React.Fragment>
  );
}

export default Purchased;