import fs from "fs";
import path from "path";
import qr from "qrcode";

const hardCodedUrl = "https://collectible.vercel.app/mint";

export function encodeVariables(
  contractAddress: string,
  tokenID: string,
  tokenUri: string,
  password: string
): string {
  const data = `${contractAddress}:::${tokenID}:::${tokenUri}:::${password}`;
  return btoa(data);
}

async function generateQR(fullUrl: string, outputPath: string) {
  return new Promise((resolve, reject) => {
    qr.toFile(outputPath, fullUrl, { type: "png" }, err => {
      if (err) reject(err);
      else resolve(true);
    });
  });
}

export async function generateQRCodes(
  communityId: string,
  collectionName: string,
  collectionAddress: string
) {
  const valuesPath = path.join(
    __dirname,
    `../nft-metadata/brands/${communityId}/${collectionName}/output/raw-merkle-values.json`
  );

  const qrOutputPath = path.join(
    __dirname,
    `../nft-metadata/brands/${communityId}/${collectionName}/output/qr-codes`
  );

  // Create an output directory if it doesn't exist
  if (!fs.existsSync(qrOutputPath)) {
    fs.mkdirSync(qrOutputPath, { recursive: true });
  }

  // Load the values from the JSON file
  const valuesJson = fs.readFileSync(valuesPath, "utf8");
  const values = JSON.parse(valuesJson);

  let links: { [key: string]: string } = {};

  for (let i = 0; i < values.length; i++) {
    const [tokenId, tokenURI, password] = values[i];

    // Encode variables and generate full URL
    const encodedKey = encodeVariables(collectionAddress, tokenId, tokenURI, password);
    const fullUrl = `${hardCodedUrl}/?key=${encodedKey}`;

    // Generate QR Code
    const fileName = `QR_${tokenId}.png`;
    const fileOutputPath = path.join(qrOutputPath, fileName);

    await generateQR(fullUrl, fileOutputPath);

    // Add the new URL to the links object
    links[tokenId] = fullUrl;

    console.log(`Generated QR Code for token ${tokenId}`);
  }

  // Save the links object to a JSON file
  const linksOutputPath = path.join(
    __dirname,
    `../nft-metadata/brands/${communityId}/${collectionName}/output/links.json`
  );
  fs.writeFileSync(linksOutputPath, JSON.stringify(links, null, 2));
}
