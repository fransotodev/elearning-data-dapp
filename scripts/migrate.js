const fs = require("fs");
const { execSync } = require("child_process");

const { argv } = require("process");
var [, , version, network] = argv;

let start, end, sourceCodeName;
if (version === "1") {
  start = 1;
  end = 2;
  sourceCodeName = "LearningDataContract";
} else if (version === "2") {
  start = 3;
  end = 3;
  sourceCodeName = "LearningDataContractV2";
} else {
  throw Error("Not suported version");
}

if (
  network === undefined ||
  network === "ganache" ||
  network === "development"
) {
  network = "development";
} else if (network !== "geth") {
  throw Error("Not suported network");
}

console.log(
  `truffle migrate --compile-all --f ${start} --to ${end} --network ${network}`
);

execSync(
  `truffle migrate --compile-all --f ${start} --to ${end} --network ${network}`,
  {
    stdio: "inherit",
  }
);

//Copying in a dapp folder
fs.copyFileSync(
  `${__dirname}/../build/contracts/${sourceCodeName}.json`,
  `${__dirname}/../dapp/src/contracts_build/LearningDataSmartContract.json`
);

console.log("Contract copied to dapp folder");
