const fs = require("fs");
const { argv } = require("process");
const [, , version] = argv;

if (version == "1") {
  fs.copyFileSync(
    `${__dirname}/../build/contracts/LearningDataContract.json`,
    `${__dirname}/../dapp/src/contracts_build/LearningDataSmartContract.json`
  );

  //Setting the gas value (a big enough value) for the contract data so hyperledger caliper doesn't complain because the estimation of gas doesn't exist
  const file = JSON.parse(
    fs.readFileSync(`${__dirname}/../build/contracts/LearningDataContract.json`)
  );
  file.gas = 3000000;
  fs.writeFileSync(
    `${__dirname}/../benchmarks/contracts/LearningDataSmartContract.json`,
    JSON.stringify(file, null, 2)
  );
}

if (version == "2") {
  fs.copyFileSync(
    `${__dirname}/../build/contracts/LearningDataContractV2.json`,
    `${__dirname}/../dapp/src/contracts_build/LearningDataSmartContract.json`
  );

  //Setting the gas value (a big enough value) for the contract data so hyperledger caliper doesn't complain because the estimation of gas doesn't exist
  const file = JSON.parse(
    fs.readFileSync(
      `${__dirname}/../build/contracts/LearningDataContractV2.json`
    )
  );
  file.gas = 3000000;
  fs.writeFileSync(
    `${__dirname}/../benchmarks/contracts/LearningDataSmartContract.json`,
    JSON.stringify(file, null, 2)
  );
}
