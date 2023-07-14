import dotenv from "dotenv";
const ethers = require("ethers");
const fs = require("fs");
const path = require("path");
dotenv.config();

const contractJsonPath = path.resolve(
  __dirname, '..',
  "artifacts/contracts/CollectibleCollection.sol/CollectibleCollection.json"
);

const contractJson = JSON.parse(fs.readFileSync(contractJsonPath, "utf8"));
const contractABI = contractJson.abi;
const provider = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_MUMBAI_URL);
const privateKey = process.env.PRIVATE_KEY;
const wallet = new ethers.Wallet(privateKey, provider);
const contractAddress = "0xbe5058039c88d3d7a4919168c910002dc0f7cf01"; // hp-01 beaconProxy collection address
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

// Define the arguments for the mint function
const tokenId = 0;
const tokenUri = "ipfs://QmYCaxMhWtdgow1LYaFJpT9S1WYB7U8nQbCMNsDe1ai4RD";
const passcode = "0x5e759fb534f669e505baa23e180c0023cadfe06f4203d87b65b1a74ad9e78c31";

// Load the proof from the merkle-proof.json file
const proofPath = path.resolve(__dirname, '..', "merkle-tree/merkle-proof.json");
const proofJson = JSON.parse(fs.readFileSync(proofPath, "utf8"));

// Convert the proof to bytes32[]
const proof = proofJson.map((p: any) => ethers.utils.arrayify(p));

// Call the mint function
async function mintToken() {
  const tx = await contract.safeMint(tokenId, tokenUri, passcode, proof);
  console.log("Transaction hash: ", tx.hash);

  // wait for the transaction to be mined
  const receipt = await tx.wait();
  console.log("Transaction was mined in block: ", receipt.blockNumber);
}

mintToken().catch(console.error);
