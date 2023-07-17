const { ethers, upgrades } = require("hardhat");
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
dotenv.config();

const beaconAddress = process.env.BEACON_ADDRESS;

export async function deployCollection(
  communityId: string,
  collectionName: string,
  collectionSymbol: string,
  nftCount: number
): Promise<string> {
  const network = await ethers.provider.getNetwork();
  const chainName = network.name === "unknown" ? "localhost" : network.name;

  // Load the implementation contract
  const CollectibleCollection = await ethers.getContractFactory("CollectibleCollection");

  const merkleRootPath = path.join(
    __dirname,
    `../nft-metadata/brands/${communityId}/${collectionName}/output/merkle-root.json`
  );
  const merkleRootJson = fs.readFileSync(merkleRootPath, "utf8");
  const merkleRoot = JSON.parse(merkleRootJson).merkleRoot;

  const beaconProxy = await upgrades.deployBeaconProxy(
    beaconAddress,
    CollectibleCollection,
    [collectionName, collectionSymbol, merkleRoot],
    { initializer: "initialize" }
  );

  // Wait for the transaction to be mined and get the transaction receipt
  const receipt = await beaconProxy.deployTransaction.wait();

  // Calculate the cost in MATIC
  const costInWei = receipt.gasUsed.mul(beaconProxy.deployTransaction.gasPrice);
  const costInMatic = ethers.utils.formatEther(costInWei);
  console.log(`Deployment cost: ${costInMatic} MATIC`);

  // Get the current balance of the deployer
  const deployerWallet = ethers.provider.getSigner(); // Get the signer
  const deployerBalanceWei = await ethers.provider.getBalance(await deployerWallet.getAddress());
  const deployerBalanceMatic = ethers.utils.formatEther(deployerBalanceWei);
  console.log(`Remaining balance in deployer's account: ${deployerBalanceMatic} MATIC`);

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
    collectionAddress: beaconProxy.address,
    chain: chainName,
    communityId: communityId,
    collectionName: collectionName,
    creationDate: new Date().toLocaleString(),
    units: nftCount,
    deployedWithBeaconAddress: beaconAddress,
  });

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  console.log(`Contract addresses have been saved to ${filePath}`);

  return beaconProxy.address;
}
