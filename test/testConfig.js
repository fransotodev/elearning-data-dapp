var LearningDataContract = artifacts.require("LearningDataContract.sol");

var Config = async function (accounts) {
  let learningDataContract = await LearningDataContract.deployed();

  return {
    owner: accounts[0],
    firstBuyer: accounts[1],
    secondBuyer: accounts[2],
    accountsToPay: [accounts[8], accounts[9]],

    mockEndpointAPI: "http://192.168.1.69/data/xAPI/statements",
    mockEndpointDashboard:
      "http://192.168.1.69/dashboards/602256f1495237043196573e/6022581a4952370431965744/Shareable",
    mockAuthorizationHeader:
      "Basic M2RlYTdkZjAxMjM0ODVlN2E2Yjk0MTFiOWE4YjM5NDY0ZDczYWE3OTowYmQ4Y2E4N2EzOWQ2NDllMjA5ODI0YzdlY2RmMDRhNWMxMzVhMjll",
    mockDescription:
      "numStatements: 250, Top10Courses: AMD, Intel, AWS, Ebay, Google, Facebook, LL, Deree, MBA, udemy",
    LearningDataContract: learningDataContract,
    toSolidityDate: (date) => {
      return date / 1000;
    },
    toJsDate: (date) => {
      return date * 1000;
    },
    nullAccount: "0x0000000000000000000000000000000000000000",
    STATUS_AVAILABLE: 0,
    STATUS_PURCHASED: 1,
  };
};

module.exports = {
  Config: Config,
};
