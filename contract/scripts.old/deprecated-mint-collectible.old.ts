import dotenv from "dotenv";
const ethers = require("ethers");
const fs = require("fs");
const path = require("path");
dotenv.config();

/**
 @DEV Not being used, this script version is still utile to mint without validating against weavedb (not recommended)
 And with arbitrary hard-coded values, instead of CLI parameters.
 */

const contractJsonPath = path.resolve(
  __dirname,
  "..",
  "artifacts/contracts/CollectibleCollection.sol/CollectibleCollection.json"
);

const contractJson = JSON.parse(fs.readFileSync(contractJsonPath, "utf8"));
const contractABI = contractJson.abi;
const provider = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_MUMBAI_URL);
const privateKey = process.env.PRIVATE_KEY_3;
const wallet = new ethers.Wallet(privateKey, provider);

// Define the arguments for the mint function
const contractAddress = "0xbe5058039c88d3d7a4919168c910002dc0f7cf01"; // hp-01 beaconProxy collection address
const tokenId = 3;
const tokenUri = "ipfs://QmXqSh5oJbZcvfYucNj5ezXykYH8HEXXBBToFugjibJZHU";
const passcode = "0x3dc09f953244c2fa5c554ef5c2c3e8d9356638bcb7ae9393c946bfcf478f7e23";

const contract = new ethers.Contract(contractAddress, contractABI, wallet);

// Load the proof from the merkle-proof.json file
const proofPath = path.resolve(__dirname, "..", "merkle-tree/merkle-proof.json");
const proofJson = JSON.parse(fs.readFileSync(proofPath, "utf8"));

// Convert the proof to bytes32[]
const proof = proofJson.map((p: any) => ethers.utils.arrayify(p));

// Call the mint function
async function mintToken() {
  console.log("parameters", [tokenId, tokenUri, passcode, proof]);
  const tx = await contract.safeMint(tokenId, tokenUri, passcode, proof);
  console.log("Transaction hash: ", tx.hash);

  // wait for the transaction to be mined
  const receipt = await tx.wait();
  console.log("Transaction was mined in block: ", receipt.blockNumber);
}

mintToken().catch(console.error);
