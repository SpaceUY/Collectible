import { create, globSource } from "ipfs-http-client";
import path from "path";
import dotenv from "dotenv";
import fs from "fs";
import { ethers } from "ethers";

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

const collectionName = "harry-potter-collection-01";
const brandName = "harry-potter";

async function main() {
  const inputDir = path.join(
    __dirname,
    `../nft-metadata/brands/${brandName}/${collectionName}/input`
  );

  // Create an output directory if it doesn't exist
  const outputDir = path.join(
    __dirname,
    `../nft-metadata/brands/${brandName}/${collectionName}/output`
  );
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Upload all images in the inputDir to IPFS
  const imgUploads = [];
  for await (const upload of ipfs.addAll(globSource(inputDir, "**/*.{png,jpg,jpeg}"), {
    wrapWithDirectory: true,
  })) {
    if (path.extname(upload.path) !== "") {
      console.log(`Uploading ${upload.path}`);
      let uploadCopy = { ...upload, cid: upload.cid.toString() };
      imgUploads.push(uploadCopy);
    }
  }

  const imgUploadsPath = path.join(outputDir, "image-uploads.json");
  fs.writeFileSync(imgUploadsPath, JSON.stringify(imgUploads, null, 2));

  // Generate metadata for all NFTs and upload to IPFS
  const metadataUploads = [];
  const rawMerkleValues = [];
  console.log(`Number of images: ${imgUploads.length}`);
  for (let i = 0; i < imgUploads.length; i++) {
    const metadata = {
      name: `${collectionName} #${i}`,
      description: `Part of the ${collectionName} collection, by ${brandName}`,
      image: `ipfs://${imgUploads[i].cid}`,
    };

    const result = await ipfs.add(JSON.stringify(metadata));
    let resultCopy = { ...result, cid: result.cid.toString() };

    metadataUploads.push(resultCopy);

    // Generate random Ethereum address for passcode
    const randomWallet = ethers.Wallet.createRandom();
    const passcode = ethers.utils.sha256(randomWallet.address);

    // Token ID is i+1, Metadata IPFS link is `ipfs://${resultCopy.cid}`, passcode is passcode
    rawMerkleValues.push([i, `ipfs://${resultCopy.cid}`, passcode]);
    console.log(`Generated merkle value for token ${i}`); // Add this line
  }

  const metadataUploadsPath = path.join(outputDir, "metadata-uploads.json");
  fs.writeFileSync(metadataUploadsPath, JSON.stringify(metadataUploads, null, 2));

  // Write raw Merkle values to a JSON file
  const rawMerkleValuesPath = path.join(outputDir, "raw-merkle-values.json");
  fs.writeFileSync(rawMerkleValuesPath, JSON.stringify(rawMerkleValues, null, 2));
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
