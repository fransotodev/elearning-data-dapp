import React, { useState, useEffect } from "react";
import { getAccount, getPurchasedOffers } from "../services/blockchainService";

function Profile(props) {
  const [account, setAccount] = useState("");
  const [numOffers, setNumOffers] = useState(0);
  useEffect(async () => {
    setAccount(await getAccount());
    const numberOffers = await getPurchasedOffers();
    setNumOffers(numberOffers.length || 0);
  }, [account, numOffers]);
  return <h1>{`The account ${account} has purchased ${numOffers} offers`}</h1>;
}

export default Profile;
