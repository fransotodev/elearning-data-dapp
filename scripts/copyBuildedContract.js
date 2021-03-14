const fs = require("fs");
const { argv } = require("process");
const [, , version] = argv;
if (version == "1") {
  fs.copyFileSync(
    `${__dirname}/../build/contracts/LearningDataContract.json`,
    `${__dirname}/../dapp/src/contracts_build/LearningDataSmartContract.json`
  );
}

if (version == "2") {
  fs.copyFileSync(
    `${__dirname}/../build/contracts/LearningDataContractV2.json`,
    `${__dirname}/../dapp/src/contracts_build/LearningDataSmartContract.json`
  );
}
