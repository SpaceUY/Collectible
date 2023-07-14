const { ethers, upgrades } = require("hardhat");
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
dotenv.config();

async function main() {
  const network = await ethers.provider.getNetwork();
  const chainName = network.name === "unknown" ? "localhost" : network.name;

  const CollectibleCollection = await ethers.getContractFactory("CollectibleCollection");

  // Deploy the beacon and link it to the implementation
  const beacon = await upgrades.deployBeacon(CollectibleCollection, {
    constructorArgs: [process.env.FORWARDER_ADDRESS],
  });
  console.log("Beacon address:", beacon.address);

  const implementationAddress = await beacon.implementation();
  console.log("Implementation address:", implementationAddress);

  // Save addresses to a JSON file inside a "deployed-contracts" folder
  const contractsPath = path.resolve(__dirname, "..", "deployed-contracts");
  if (!fs.existsSync(contractsPath)) {
    fs.mkdirSync(contractsPath);
  }

  const filePath = path.join(contractsPath, "deployed-beacon.json");

  // Check if the file exists. If it does, read its content, otherwise initialize an empty array
  let data = [];
  if (fs.existsSync(filePath)) {
    data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  }

  // Append the new deployment information
  data.push({
    implementationAddress,
    beaconAddress: beacon.address,
    chain: chainName,
    time: new Date().toLocaleString(),
  });

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  console.log(`Contract addresses have been saved to ${filePath}`);

  // Begin verification process after the file write operation
  // console.log("Waiting for transactions to be mined before verification...");
  // await new Promise(resolve => setTimeout(resolve, 15000));

  // console.log("Verifying Implementation contract...");
  // run("verify:verify", {
  //   address: implementation.address,
  //   constructorArguments: [process.env.FORWARDER_ADDRESS],
  // });

  // console.log("Verifying Beacon contract...");
  // run("verify:verify", {
  //   address: beacon.address,
  //   constructorArguments: [],
  // });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
