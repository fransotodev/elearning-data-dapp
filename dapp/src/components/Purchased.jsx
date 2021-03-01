import React from "react";
import Button from "./Button";
import OfferTable from "./common/OfferTable";
import VisualizeButton from "./VisualizeButton";
import PropTypes from "prop-types";

function Purchased({ purchasedOffers, handleDownloadDataButtonClick }) {
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

Purchased.propTypes = {
  purchasedOffers: PropTypes.array.isRequired,
  handleDownloadDataButtonClick: PropTypes.func.isRequired,
};

export default Purchased;
