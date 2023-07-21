import { program } from "commander";
import dotenv from "dotenv";
const ethers = require("ethers");
import fs from "fs";
import path from "path";
import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import { Command } from "commander";
import { weaveDB } from "../weavedb";

dotenv.config();

const collectible = new Command("collectible");

const contractJsonPath = path.resolve(
  __dirname,
  "../artifacts/contracts/CollectibleCollection.sol/CollectibleCollection.json"
);

const contractJson = JSON.parse(fs.readFileSync(contractJsonPath, "utf8"));
const contractABI = contractJson.abi;
const provider = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_MUMBAI_URL);
const privateKey = process.env.PRIVATE_KEY_3;
const wallet = new ethers.Wallet(privateKey as string, provider);

function generateProof(tokenId: number, treeJson: string) {
  // Load the tree
  const treeData = JSON.parse(treeJson);
  const tree = StandardMerkleTree.load(treeData);

  for (const [i, v] of tree.entries()) {
    if (v[0] === tokenId) {
      const proof = tree.getProof(i);
      return proof.map((p: any) => ethers.utils.arrayify(p));
    }
  }

  throw new Error(`Token ID ${tokenId} not found in tree`);
}

collectible
  .command("mint <communityId> <collectionName> <tokenId> <tokenUri> <passcode>")
  .description("mint a new collectible token")
  .action(async (communityId, collectionName, tokenId, tokenUri, passcode) => {
    const db = await weaveDB();

    const community = await db.get("communities", communityId);

    if (!community) {
      throw new Error(`Community ${communityId} not found`);
    }
    console.log("Found community on WeaveDB!");

    const collection = community.collections.find((item: any) => item.name === collectionName);
    if (!collection) {
      throw new Error(
        `Collection ${collectionName} not found in communityId: ${communityId}, with communityName ${community.name}`
      );
    }
    console.log("Found collection on WeaveDB!");

    const contract = new ethers.Contract(collection.address, contractABI, wallet);

    // Load the proof from the static Merkle tree file
    const treePath = path.join(
      __dirname,
      `../nft-metadata/brands/${communityId}/${collectionName}/output/merkle-tree.json`
    );
    const treeJson = fs.readFileSync(treePath, "utf8");
    const proof = generateProof(parseInt(tokenId), treeJson);

    try {
      console.log("\nparameters", [tokenId, tokenUri, passcode, proof]);

  
      const tx = await contract.safeMint(tokenId, tokenUri, passcode, proof);
      console.log("Transaction hash: ", tx.hash);

      // wait for the transaction to be mined
      const receipt = await tx.wait();
      console.log("Transaction was mined in block: ", receipt.blockNumber);

    } catch (error) {
      console.log(error);
    } finally {
      console.log("Minted token with ID", tokenId, "successfully!, for address: ", wallet.address);


    }
  });

export default collectible;
