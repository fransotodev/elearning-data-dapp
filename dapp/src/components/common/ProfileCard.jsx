import React from "react";

const ProfileCard = ({ mainText, secondText, thirdText, image }) => {
  return (
    <div className="col  bg-light">
      <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
        <div className="col p-4 d-flex flex-column position-static">
          <h3>
            <strong className="d-inline-block mb-2 text-primary">
              {mainText}
            </strong>
          </h3>
          <h5 className="mb-0">{secondText}</h5>
        </div>
        <div className="container">
          <h1 className="" style={{ textAlign: "center" }}>
            <strong>{thirdText}</strong>
          </h1>
          <img
            className="img-fluid"
            style={{
              // marginLeft: "40%",
              width: "150px",
            }}
            src={image}
            alt="Eth Coin"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;