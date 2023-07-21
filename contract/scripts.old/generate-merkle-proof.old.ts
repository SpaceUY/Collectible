import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import fs from "fs";
import path from "path";

/**
 @DEV Not being used, currently being executed directly on smart-scripts/mint-collectible.ts
 */

// Load the Merkle Tree from the JSON file
const treeJson = fs.readFileSync(
  path.resolve(__dirname, "..", "merkle-tree/merkle-tree.json"),
  "utf8"
);
const treeData = JSON.parse(treeJson);

// Load the tree
const tree = StandardMerkleTree.load(treeData);

// Function to generate proof for a given token
function generateProof(tokenId: number) {
  for (const [i, v] of tree.entries()) {
    if (v[0] === tokenId) {
      const proof = tree.getProof(i);
      console.log("Value:", v);
      console.log("Proof:", proof);
      // Write the proof to a JSON file
      fs.writeFileSync("merkle-tree/merkle-proof.json", JSON.stringify(proof, null, 2));
      break;
    }
  }
}

// Replace with the tokenId you want to generate a proof for
generateProof(3);
