import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import fs from "fs";
import path from "path";

// (1) Load the values from the JSON file
const valuesJson = fs.readFileSync(path.join(__dirname, "..", "merkle-tree/raw-merkle-values.json"), "utf8");
const values = JSON.parse(valuesJson);
console.log("Loaded values!", values);

// (2)
const tree = StandardMerkleTree.of(values, ["uint256", "string", "string"]);

// (3)
console.log("Merkle Root:", tree.root);
fs.writeFileSync("merkle-tree/merkle-root.json", JSON.stringify({ merkleRoot: tree.root }));

// (4) Write the Merkle tree to a JSON file
fs.writeFileSync("merkle-tree/merkle-tree.json", JSON.stringify(tree.dump()));

// (5) Also save the Merkle tree inside the frontend folder (for the frontend to use)
const frontendOutputPath = "../frontend/public/merkle-tree.json";
fs.mkdirSync(path.dirname(frontendOutputPath), { recursive: true });
fs.writeFileSync(frontendOutputPath, JSON.stringify(tree.dump()));
