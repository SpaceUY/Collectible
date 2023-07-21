import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import fs from "fs";
import path from "path";

export async function generateMerkleTree(communityId: string, collectionName: string) {
  const valuesPath = path.join(
    __dirname,
    `../nft-metadata/brands/${communityId}/${collectionName}/output/raw-merkle-values.json`
  );

  // (1) Load the values from the JSON file
  const valuesJson = fs.readFileSync(valuesPath, "utf8");
  const values = JSON.parse(valuesJson);

  // (2) Generate the Merkle tree
  const tree = StandardMerkleTree.of(values, ["uint256", "string", "string"]);

  // (3) Log and save the Merkle root
  console.log("Merkle Root:", tree.root);
  const rootPath = path.join(
    __dirname,
    `../nft-metadata/brands/${communityId}/${collectionName}/output/merkle-root.json`
  );
  fs.writeFileSync(rootPath, JSON.stringify({ merkleRoot: tree.root }));

  // (4) Write the Merkle tree to a JSON file
  const treePath = path.join(
    __dirname,
    `../nft-metadata/brands/${communityId}/${collectionName}/output/merkle-tree.json`
  );
  fs.writeFileSync(treePath, JSON.stringify(tree.dump()));

  // // (5) Also save the Merkle tree inside the frontend folder (for the frontend to use)
  // const frontendOutputPath = "../frontend/public/merkle-trees/merkle-tree.json";
  // fs.mkdirSync(path.dirname(frontendOutputPath), { recursive: true });
  // fs.writeFileSync(frontendOutputPath, JSON.stringify(tree.dump()));
}
