const LearningDataContract = artifacts.require("LearningDataContract");

const { deployProxy } = require("@openzeppelin/truffle-upgrades");

module.exports = async function (deployer) {
  const result = await deployProxy(LearningDataContract, [], {
    deployer,
  });
};
