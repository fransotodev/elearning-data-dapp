const LearningDataContract = artifacts.require("LearningDataContract");

module.exports = function (deployer) {
  deployer.deploy(LearningDataContract);
};
