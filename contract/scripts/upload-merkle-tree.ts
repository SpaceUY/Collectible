import { create } from "ipfs-http-client";
import path from "path";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

// Initialize IPFS client
const auth =
  "Basic " +
  Buffer.from(process.env.INFURA_API_KEY + ":" + process.env.INFURA_API_KEY_SECRET).toString(
    "base64"
  );

const ipfs = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

export async function uploadMerkleTree(
  communityId: string,
  collectionName: string
): Promise<string> {
  // Path to the merkle tree JSON file
  const merkleTreePath = path.join(
    __dirname,
    `../nft-metadata/brands/${communityId}/${collectionName}/output/merkle-tree.json`
  );

  // Read the merkle tree from the JSON file
  const merkleTreeJson = fs.readFileSync(merkleTreePath, "utf8");

  // Upload the merkle tree to IPFS
  const result = await ipfs.add(merkleTreeJson);

  // Log and return the CID
  console.log(`Uploaded Merkle tree to IPFS. CID: ${result.cid}`);
  return result.cid.toString();
}
