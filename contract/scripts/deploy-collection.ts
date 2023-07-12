import { ethers } from "hardhat";
import dotenv from "dotenv";
dotenv.config();

const collectionName = "collection-test-01"; // Replace with your actual collection name
const collectionSymbol = "CT1"; // Replace with your actual collection symbol
const merkleRoot = "0x623abbbb75e1a0ecf09ccba73b3eaed21c462c0e65de225d218c54e551c128c9"; // Replace with your actual Merkle root

async function main() {
  // Load the implementation contract
  const CollectibleCollection = await ethers.getContractFactory("CollectibleCollection");

  // Load the beacon (this should already be deployed)
  const beacon = CollectibleCollection.attach(process.env.BEACON_ADDRESS as string);

  // Deploy a new proxy for the collection
  const Proxy = await ethers.getContractFactory("TransparentUpgradeableProxy");
  const proxy = await Proxy.deploy(beacon.address, process.env.FORWARDER_ADDRESS, "0x");
  await proxy.deployed();
  console.log("Proxy address:", proxy.address);

  // Initialize the new collection
  const proxyAsCollectibleCollection = CollectibleCollection.attach(proxy.address);
  await proxyAsCollectibleCollection.initialize(collectionName, collectionSymbol, merkleRoot);
  console.log("Collection has been initialized");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
