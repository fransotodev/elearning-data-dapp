const Web3 = require("web3");
const CompiledContract = require("../dapp/src/contracts_build/LearningDataSmartContract.json");
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
    var netData = CompiledContract.networks[netId];
    if (netData) {
      var LearningDataContract = new web3.eth.Contract(
        CompiledContract.abi,
        netData.address
      );
      resolve(LearningDataContract);
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
    const description = `${data[`Store${i}`].numberStatements} Statements | ${
      data[`Store${i}`].date
    } | ${data[`Store${i}`].keywords}`;

    const priceEth = data[`Store${i}`].numberStatements / 100;
    const priceWei = web3.utils.toWei(priceEth.toString(), "Ether");

    await LearningDataContract.methods
      .registerOffer(
        endpointAPI,
        endpointDashboard,
        authorizationHeader,
        description,
        priceWei,
        accountsToPay
      )
      .send({ from: accounts[3], gas: 3000000 });
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
