import React, { useState, useEffect } from "react";
import {
  getAccount,
  getPurchasedOffers,
  getBalanceEth,
  isContractOwner,
  getContractStatus,
  setContractStatus,
} from "../services/blockchainService";
import { ReactComponent as LoadingIcon } from "../assets/Spinner-1s-200px.svg";
import ethCoin from "../assets/ethCoin.png";
import dataStore from "../assets/dataStore.png";
import PropTypes from "prop-types";
import ProfileCard from "./common/ProfileCard";
import OwnerMenu from "./OwnerMenu";

async function handleButtonClick(text) {
  await setContractStatus(text);
  window.location.reload();
}

function Profile({ numStatements, isOwner, contractStatus }) {
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
        {isOwner && (
          <OwnerMenu
            contractStatus={contractStatus}
            handleButtonClick={handleButtonClick}
          />
        )}

        <div className="row text-center mt-4">
          <ProfileCard
            mainText={"Your Account"}
            secondText={address}
            thirdText={`${balance} ETH`}
            image={ethCoin}
          />
          <ProfileCard
            mainText={"Purchased Data"}
            secondText={`${numOffers} Offers`}
            thirdText={`${numStatements} Statements`}
            image={dataStore}
          />
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
