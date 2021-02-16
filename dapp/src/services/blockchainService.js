import Web3 from "web3";
import ContractJSON from "../abis/LearningDataContract.json";
export async function loadWeb3() {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
    // console.log("Loaded ethereum");
  } else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider);
    // console.log("Loaded currentProvider");
  } else {
    window.alert(
      "Non-Ethereum browser detected. You should consider trying MetaMask!"
    );
  }
}

export async function testBlockchain() {
  const web3 = window.web3;

  const accounts = await web3.eth.getAccounts();
  const networkId = await web3.eth.net.getId(); //For ganache, it will be 5777

  const networkData = ContractJSON.networks[networkId];
  if (networkData) {
    const Contract = new web3.eth.Contract(
      ContractJSON.abi,
      networkData.address
    );
    const number = await Contract.methods.numOffers().call();
    console.log(number);
  }

  // console.log(accounts);
}
