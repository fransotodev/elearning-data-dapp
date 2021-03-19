const fs = require("fs");
const { execSync } = require("child_process");

const { argv } = require("process");
const [, , version] = argv;

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

console.log(`truffle migrate --compile-all --f ${start} --to ${end}`);

execSync(`truffle migrate --compile-all --f ${start} --to ${end}`, {
  stdio: "inherit",
});

//Copying in a dapp folder
fs.copyFileSync(
  `${__dirname}/../build/contracts/${sourceCodeName}.json`,
  `${__dirname}/../dapp/src/contracts_build/LearningDataSmartContract.json`
);

//Copying in a benchmark folder
const file = JSON.parse(
  fs.readFileSync(`${__dirname}/../build/contracts/${sourceCodeName}.json`)
);
//Gas estimation value (big enough to avoid Caliper complaining)
file.gas = 3000000;
fs.writeFileSync(
  `${__dirname}/../benchmarks/contracts/LearningDataSmartContract.json`,
  JSON.stringify(file, null, 2)
);

console.log("Contract copied to benchmark and dapp folders");
