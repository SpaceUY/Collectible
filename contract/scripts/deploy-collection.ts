const { ethers, upgrades } = require("hardhat");
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
dotenv.config();

const collectionName = "hp-collection-01"; // Replace with your actual collection name
const collectionSymbol = "HP1"; // Replace with your actual collection symbol
const merkleRoot = "0x484d22fe68a613f51457bfacae929dae61af9268bb782c3394c00803a8ef58fb"; // Replace with your actual Merkle root
const beaconAddress = process.env.BEACON_ADDRESS;

async function main() {
  const network = await ethers.provider.getNetwork();
  const chainName = network.name === "unknown" ? "localhost" : network.name;

  // Load the implementation contract
  const CollectibleCollection = await ethers.getContractFactory("CollectibleCollection");

  // const beacon = await ethers.getContractAt("Beacon", beaconAddress);
  const beaconProxy = await upgrades.deployBeaconProxy(
    beaconAddress,
    CollectibleCollection,
    [collectionName, collectionSymbol, merkleRoot],
    { initializer: "initialize" }
  );

  console.log("BeaconProxy deployed to:", beaconProxy.address);

  // Save addresses to a JSON file inside a "deployed-contracts" folder
  const contractsPath = path.resolve(__dirname, "..", "deployed-contracts");
  if (!fs.existsSync(contractsPath)) {
    fs.mkdirSync(contractsPath);
  }
  const filePath = path.join(contractsPath, "deployed-proxy.json");

  // Check if the file exists. If it does, read its content, otherwise initialize an empty array
  let data = [];
  if (fs.existsSync(filePath)) {
    data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  }

  // Append the new deployment information
  data.push({
    beaconProxyAddress: beaconProxy.address,
    deployedWithBeaconAddress: beaconAddress,
    chain: chainName,
    time: new Date().toLocaleString(),
  });

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  console.log(`Contract addresses have been saved to ${filePath}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
