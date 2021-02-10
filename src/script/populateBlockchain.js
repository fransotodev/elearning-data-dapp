const Web3 = require("web3");
const ContractABI = require("../../build/contracts/LearningDataContract.json");
const data = require("./data");

function getWeb3() {
  if (typeof web3 !== "undefined") {
    let web3 = new Web3(web3.currentProvider);
    return web3;
  } else {
    let web3 = new Web3("ws://localhost:8545");
    return web3;
  }
}

function closeWeb3(web3) {
  web3.currentProvider.connection.close();
}

function fetchContract(web3) {
  return new Promise(async (resolve, reject) => {
    var netId = await web3.eth.net.getId();
    var netData = ContractABI.networks[netId];
    if (netData) {
      var DataMarket = new web3.eth.Contract(ContractABI.abi, netData.address);
      resolve(DataMarket);
    } else {
      reject("Contract has not been deployed to detected network");
    }
  });
}

async function populate(cb) {
  const accountsToPay = [accounts[8], accounts[9]];

  for (var i = 1; i <= 4; i++) {
    const endpointAPI = data.endpointAPI;
    const endpointDashboard = data[`Store${i}`].endpointDashboard;
    const authorizationHeader = data[`Store${i}`].authorizationHeader;
    const description = data[`Store${i}`].description;

    const number = data[`Store${i}`].numberStatements / 100;
    const price = web3.utils.toWei(number.toString(), "Ether");

    await LearningDataContract.methods
      .registerOffer(
        endpointAPI,
        endpointDashboard,
        authorizationHeader,
        description,
        price,
        accountsToPay
      )
      .send({ from: accounts[0], gas: 3000000 });
  }

  cb();
}

async function main() {
  this.web3 = getWeb3();
  this.LearningDataContract = await fetchContract(web3);
  this.accounts = await web3.eth.getAccounts();

  populate.bind(this)(async () => {
    const numOffers = await LearningDataContract.methods.numOffers().call();
    console.log(numOffers, "offers:");

    for (let i = 0; i < numOffers; i++) {
      console.log(await LearningDataContract.methods.getOffer(i).call());
    }
    closeWeb3(web3);
  });
}

main();
