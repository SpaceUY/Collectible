import { create, globSource } from "ipfs-http-client";
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

const collectionName = "harry-potter-collection-01"; // Replace with your actual collection name
const brandName = "harry-potter"; // Replace with your actual brand name

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
  for await (const upload of ipfs.addAll(globSource(inputDir, "**/*.png"), {
    wrapWithDirectory: true,
  })) {
    let uploadCopy = { ...upload, cid: upload.cid.toString() }; // Making a copy and converting CID to string
    imgUploads.push(uploadCopy);
  }

  const imgUploadsPath = path.join(outputDir, "image-uploads.json");
  fs.writeFileSync(imgUploadsPath, JSON.stringify(imgUploads, null, 2));

  // Generate metadata for all NFTs and upload to IPFS
  const metadataUploads = [];
  for (let i = 0; i < imgUploads.length; i++) {
    const metadata = {
      name: `${collectionName} #${i}`,
      description: `Part of the ${collectionName} collection, by ${brandName}`,
      image: `ipfs://${imgUploads[i].cid}`,
    };

    const result = await ipfs.add(JSON.stringify(metadata));
    let resultCopy = { ...result, cid: result.cid.toString() }; // Making a copy and converting CID to string
    metadataUploads.push(resultCopy);
  }

  const metadataUploadsPath = path.join(outputDir, "metadata-uploads.json");
  fs.writeFileSync(metadataUploadsPath, JSON.stringify(metadataUploads, null, 2));
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
