//Not using this script, it probably overlap

const fs = require("fs");
const { execSync } = require("child_process");

const { argv } = require("process");
const [, , folder] = argv;

const listConfigs = fs.readdirSync(
  `${__dirname}/../benchmarks/config/${folder}`
);

let networkConfigFile =
  folder === "ganache" ? "networkConfigGanache" : "networkConfigGeth";

listConfigs.map(async (configFile, index) => {
  console.log(index);
  execSync(
    `npx caliper launch manager --caliper-workspace ${__dirname}/../benchmarks/ --caliper-benchconfig config/${folder}/${configFile} --caliper-networkconfig networks//${networkConfigFile}.json`,
    { stdio: "inherit" }
  );
  fs.copyFileSync(
    `${__dirname}/../benchmarks/report.html`,
    `${__dirname}/../benchmarks/results/report_${folder}_${index + 1}.html`
  );
  return null;
});
