const { upgradeProxy } = require("@openzeppelin/truffle-upgrades");

const LearningDataContract = artifacts.require("LearningDataContract");
const LearningDataContractV2 = artifacts.require("LearningDataContractV2");

module.exports = async function (deployer) {
  const existing = await LearningDataContract.deployed();
  const instance = await upgradeProxy(
    existing.address,
    LearningDataContractV2,
    { deployer }
  );
  console.log("Upgraded", instance.address);
};
