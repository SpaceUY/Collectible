import { ethers, upgrades } from "hardhat";
import dotenv from "dotenv";
dotenv.config();

async function main() {
  const CollectibleCollection = await ethers.getContractFactory("CollectibleCollection");
  const implementation = await CollectibleCollection.deploy();
  await implementation.deployed();
  console.log("Implementation address:", implementation.address);

  // Deploy the beacon and link it to the implementation
  const beacon = await upgrades.deployBeacon(CollectibleCollection, {
    constructorArgs: [process.env.FORWARDER_ADDRESS],
  });
  console.log("Beacon address:", beacon.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
