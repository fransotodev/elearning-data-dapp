var LearningDataContract = artifacts.require("LearningDataContract.sol");

var Config = async function (accounts) {
  // These test addresses are useful when you need to add
  // multiple users in test scripts.
  /*
    let testAddresses = [
        "0x69e1CB5cFcA8A311586e3406ed0301C06fb839a2",
        "0xF014343BDFFbED8660A9d8721deC985126f189F3",
        "0x0E79EDbD6A727CfeE09A2b1d0A59F7752d5bf7C9",
        "0x9bC1169Ca09555bf2721A5C9eC6D69c8073bfeB4",
        "0xa23eAEf02F9E0338EEcDa8Fdd0A73aDD781b2A86",
        "0x6b85cc8f612d5457d49775439335f83e12b8cfde",
        "0xcbd22ff1ded1423fbc24a7af2148745878800024",
        "0xc257274276a4e539741ca11b590b9447b26a8051",
        "0x2f2899d6d35b1a48a4fbdc93a37a72f264a9fca7"
    ];
    */

  let learningDataContract = await LearningDataContract.deployed();

  return {
    owner: accounts[0],
    firstBuyer: accounts[1],
    secondBuyer: accounts[2],
    accountsToPay: [accounts[8], accounts[9]],

    mockEndpointAPI: "http://192.168.1.69/data/xAPI/statements",
    mockEndpointDashboard:
      "http://192.168.1.69/dashboards/602256f1495237043196573e/6022581a4952370431965744/Shareable",
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
    STATUS_PURCHASED: 10,
  };
};

module.exports = {
  Config: Config,
};
