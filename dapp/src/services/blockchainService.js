import Web3 from "web3";
import ContractJSON from "../contracts_build/LearningDataSmartContract.json";

const STATUS_AVAILABLE = 0;
const STATUS_PURCHASED = 1;

export async function loadWeb3() {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
    console.log("Loaded ethereum");
  } else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider);
    console.log("Loaded currentProvider");
  } else {
    console.warn(
      "Non-Ethereum browser detected. You should consider using MetaMask"
    );
  }
}

export async function testBlockchain() {
  const { Contract, account } = await createContract();

  console.log("ACCOUNT: ", account);

  const numberOffers = await Contract.methods.numOffers().call();
  console.log("NUMOFFERS: ", numberOffers);
}

export async function isContractOwner() {
  const { Contract, account } = await createContract();
  const owner = await Contract.methods.owner().call();

  return account === owner;
}

export async function getContractStatus() {
  const { Contract } = await createContract();
  const result = await Contract.methods.getContractStatus().call();

  return result;
}

export async function setContractStatus(status) {
  const { Contract, account } = await createContract();

  switch (status) {
    case "Active":
      await Contract.methods.setStatusActive().send({ from: account });
      break;
    case "OnlyQueries":
      await Contract.methods.setStatusOnlyQueries().send({ from: account });
      break;
    case "Stopped":
      await Contract.methods.setStatusStopped().send({ from: account });
      break;
    default:
  }
}

export async function numOffers() {
  const { Contract } = await createContract();

  return Contract.methods.numOffers().call();
}

export async function getOffers() {
  const { Contract, account } = await createContract();

  const numOffers = await Contract.methods.numOffers().call();
  const Offers = [];

  for (var i = 0; i < numOffers; i++) {
    const offer = await Contract.methods.getOffer(i).call({ from: account });
    mapOffer(offer, i);

    if (offer.status === STATUS_AVAILABLE) {
      Offers.push(offer);
    }
  }
  return Offers;
}

export async function getOffer(id) {
  const { Contract, account } = await createContract();

  const offer = await Contract.methods.getOffer(id).call({ from: account });
  mapOffer(offer, id);

  return offer;
}

export async function getPurchasedOffers() {
  const { Contract, account } = await createContract();

  const purchasedOffers = await Contract.methods
    .getPurchasedOffersIndexes(account)
    .call({ from: account });
  return purchasedOffers;
}

export async function purchaseOffer(index) {
  const { Contract, account } = await createContract();

  const offer = await Contract.methods.getOffer(index).call();
  mapOffer(offer, index);
  if (offer.status === STATUS_AVAILABLE) {
    await Contract.methods
      .purchaseOffer(index)
      .send({ from: account, value: offer.price });
  }

  const offerPurchased = await Contract.methods
    .getOffer(index)
    .call({ from: account });
  await mapOffer(offerPurchased, index);

  return offerPurchased;
}

export async function registerOffer(offerData, cb = null) {
  const { Contract, account, web3 } = await createContract();

  const index = await Contract.methods
    .registerOffer(
      offerData.endpointAPI,
      offerData.endpointDashboard,
      offerData.authHeader,
      offerData.description,
      web3.utils.toWei(offerData.price, "Ether"),
      offerData.accountsToPay
    )
    .send({ from: account, gas: 3000000 });

  if (cb) {
    cb();
  }
}

async function createContract() {
  const web3 = window.web3;

  const networkId = await web3.eth.net.getId(); //For ganache, it will be 5777
  const accounts = await web3.eth.getAccounts();
  const networkData = ContractJSON.networks[networkId];
  try {
    const Contract = new web3.eth.Contract(
      ContractJSON.abi,
      networkData.address
    );

    return {
      web3: web3,
      Contract: Contract,
      account: accounts[0],
    };
  } catch (error) {
    console.error(error);
  }
}

function mapOffer(offer, index) {
  offer.endpointAPI = offer["0"];
  offer.endpointDashboard = offer["1"];
  offer.authorizationHeader = offer["2"];
  offer.description = offer["3"];
  offer.price = offer["4"];
  offer.status = parseInt(offer["5"]);
  offer.index = index;
  delete offer["0"];
  delete offer["1"];
  delete offer["2"];
  delete offer["3"];
  delete offer["4"];
  delete offer["5"];
}

export async function getAccount() {
  const { account } = await createContract();
  return account;
}

export async function getBalanceEth() {
  const { web3, account } = await createContract();
  const balance = await web3.eth.getBalance(account);
  return web3.utils.fromWei(balance);
}
