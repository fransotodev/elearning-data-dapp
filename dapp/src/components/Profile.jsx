import React, { useState, useEffect } from "react";
import {
  getAccount,
  getPurchasedOffers,
  getBalanceEth,
} from "../services/blockchainService";
import { ReactComponent as LoadingIcon } from "../assets/Spinner-1s-200px.svg";
import ethCoin from "../assets/ethCoin.png";
import dataStore from "../assets/dataStore.png";
import PropTypes from "prop-types";

function Profile({ numStatements }) {
  const [accountData, setAccountData] = useState({});
  const [numOffers, setNumOffers] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDataBlockchain() {
      const address = await getAccount();
      const balance = await getBalanceEth();
      setAccountData({ address, balance });
      const numberOffers = await getPurchasedOffers();
      setNumOffers(numberOffers.length || 0);
      setLoading(false);
    }
    fetchDataBlockchain();
  }, []);

  if (loading) return <LoadingIcon />;
  else {
    const { address, balance } = accountData;
    return (
      <>
        <div className="row text-center mt-4">
          <div className="col bg-light">
            <div className="row border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
              <div className="col p-4 d-flex flex-column position-static">
                <h3>
                  <strong className="d-inline-block mb-2 text-primary">
                    Your Account
                  </strong>
                </h3>
                <h5 className="mb-0">{address}</h5>
              </div>
              <div className="container">
                <h1 className="" style={{ textAlign: "center" }}>
                  <strong>{balance} ETH</strong>
                </h1>
                <img
                  style={{
                    // marginLeft: "40%",
                    width: "150px",
                  }}
                  src={ethCoin}
                  alt="Eth Coin"
                />
              </div>
            </div>
          </div>

          {/* Refactor this 2 cards into a reusable component*/}
          <div className="col  bg-light">
            <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
              <div className="col p-4 d-flex flex-column position-static">
                <h3>
                  <strong className="d-inline-block mb-2 text-primary">
                    Purchased Data
                  </strong>
                </h3>
                <h5 className="mb-0">{numOffers} Offers</h5>
              </div>
              <div className="container">
                <h1 className="" style={{ textAlign: "center" }}>
                  <strong>{numStatements} Statements</strong>
                </h1>
                <img
                  className="img-fluid"
                  style={{
                    // marginLeft: "40%",
                    width: "150px",
                  }}
                  src={dataStore}
                  alt="Eth Coin"
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

Profile.propTypes = {
  numStatements: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
};
export default Profile;
