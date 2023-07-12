import { ethers } from "hardhat";
import dotenv from "dotenv";
dotenv.config();

async function main() {
  // Load the Beacon contract
  const Beacon = await ethers.getContractFactory("Beacon");
  const beacon = Beacon.attach(process.env.FORWARDER_ADDRESS as string);

  // Deploy the new implementation contract
  const NewCollectibleCollection = await ethers.getContractFactory("NewCollectibleCollection");
  const newImplementation = await NewCollectibleCollection.deploy();
  await newImplementation.deployed();
  console.log("New implementation address:", newImplementation.address);

  // Update the beacon to point to the new implementation
  await beacon.upgradeTo(newImplementation.address);
  console.log("Beacon has been updated to point to the new implementation");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
