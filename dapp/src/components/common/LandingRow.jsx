import React from "react";

const LandingRow = ({ text1, text2, text3, image, leftAlignment }) => {
  return (
    <>
      <div className="row featurette">
        <div
          className={`col-md-7 mt-4 ${
            leftAlignment ? " order-md-2" : " text-right"
          }`}
        >
          <h2 className="featurette-heading ">
            <span className="font-weight-bold">{text1}</span>
            <br />
            <span className="text-muted"> {text2}</span>
          </h2>

          <p className="lead">{text3}</p>
        </div>
        <div className={`col-md-5 mt-4 ${leftAlignment ? "order-md-1" : ""}`}>
          <img
            className="featurette-image img-fluid mx-auto"
            style={{ width: "500px" }}
            src={image}
            alt="Decentralized"
          />
        </div>
      </div>
    </>
  );
};

export default LandingRow;