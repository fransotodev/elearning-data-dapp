const fs = require("fs");
const { execSync } = require("child_process");

const { argv } = require("process");
const [, , folderName] = argv;

console.log(`truffle compile --all`);

execSync(`truffle compile --all`, {
  stdio: "inherit",
});

//Copying in a benchmark folder
const file = JSON.parse(
  fs.readFileSync(`${__dirname}/../build/contracts/LearningDataContractV2.json`)
);

//Gas estimation value (big enough to avoid Caliper complaining on Contract deployment)
file.gas = 3000000;

fs.writeFileSync(
  `${__dirname}/../benchmarks/contracts/LearningDataSmartContract.json`,
  JSON.stringify(file, null, 2)
);

const listConfigs = fs.readdirSync(
  `${__dirname}/../benchmarks/config/${folderName}`
);

let networkConfigFile =
  folderName === "ganache" ? "networkConfigGanache" : "networkConfigGeth";

listConfigs.map(async (configFile, index) => {
  console.log(index);

  execSync(
    `npx caliper launch manager --caliper-workspace ${__dirname}/../benchmarks/ --caliper-benchconfig config/${folderName}/${configFile} --caliper-networkconfig networks/${networkConfigFile}.json`,
    { stdio: "inherit" }
  );
  fs.copyFileSync(
    `${__dirname}/../benchmarks/report.html`,
    `${__dirname}/../benchmarks/results/report_${folderName}_${index + 1}.html`
  );
  return null;
});
