import React from "react";
import Button from "./Button";
import OfferTable from "./common/OfferTable";
import VisualizeButton from "./VisualizeButton";

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
              className="btn-block"
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
