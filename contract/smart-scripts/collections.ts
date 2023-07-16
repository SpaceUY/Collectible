import { Command } from "commander";
import path from "path";
import fs from "fs";
import { weaveDB } from "../weavedb"; // Update the path accordingly
import { uploadMetadata } from "../scripts/upload-metadata";
import { generateMerkleTree } from "../scripts/generate-merkle-tree";
import { deployCollection } from "../scripts/deploy-collection";
import dotenv from "dotenv";

dotenv.config();

const collection = new Command("collection");

collection
  .command("create <brandName> <collectionName> <description> <symbol> <nftCountStr>")
  .description("Generates all the elements necessary for a collection and deploys it")
  .action(async (brandName, collectionName, description, symbol, nftCountStr) => {
    console.log("Collection create called!");
    console.log(
      "\nbrandName:",
      brandName,
      "\ncollectionName:",
      collectionName,
      "\ndescription:",
      description,
      "\nsymbol:",
      symbol,
      "\nnftCountStr:",
      nftCountStr
    );
    // Validate brandName
    if (typeof brandName !== "string" || brandName.length === 0) {
      console.error("Invalid brand name. Please provide a valid string.");
      process.exit(1);
    }

    // Validate collectionName
    if (typeof collectionName !== "string" || collectionName.length === 0) {
      console.error("Invalid collection name. Please provide a valid string.");
      process.exit(1);
    }

    // Validate description
    if (typeof description !== "string" || description.length === 0) {
      console.error("Invalid description. Please provide a valid string.");
      process.exit(1);
    }

    // Validate symbol
    if (typeof symbol !== "string" || symbol.length === 0) {
      console.error("Invalid symbol. Please provide a valid string.");
      process.exit(1);
    }

    // Convert string to number
    const nftCount = parseInt(nftCountStr, 10);
    // Then check if it's a valid number
    if (isNaN(nftCount) || nftCount <= 0) {
      console.error("Invalid NFT count. Please provide a number greater than 0.");
      process.exit(1);
    }

    // 1. Upload Metadata
    console.log("\n1. Uploading metadata...");
    await uploadMetadata(brandName, collectionName, description, nftCount);

    console.log("\n2. Generating Merkle Tree from the Merkle values (leafs)...");
    // 2. Generate Merkle Tree
    await generateMerkleTree(brandName, collectionName);

    console.log("\n3. Deploying collection contract...");
    // 3. Deploy Collection
    await deployCollection(brandName, collectionName, symbol, nftCount);

    console.log("\n4. Upload collection to the WeaveDB community");

    console.log("Collection created successfully.");
  });

collection
  .command("list")
  .description("List all the collections")
  .action(() => {
    console.log("Collections List:");
    const collectionsPath = path.resolve(
      __dirname,
      "..",
      "deployed-contracts",
      "deployed-proxy.json"
    );
    // Check if the file exists. If it does, read its content, otherwise log an appropriate message
    if (fs.existsSync(collectionsPath)) {
      const collectionsData = JSON.parse(fs.readFileSync(collectionsPath, "utf8"));
      collectionsData.forEach((collection: any, index: number) => {
        console.log(`\nCollection ${index + 1}:`);
        console.log("Brand Name:", collection.brandName);
        console.log("Collection Name:", collection.collectionName);
        console.log("Units:", collection.units);
        console.log("Beacon Proxy Address:", collection.beaconProxyAddress);
        console.log("Deployed With Beacon Address:", collection.deployedWithBeaconAddress);
        console.log("Chain:", collection.chain);
        console.log("Deployed at:", collection.time);
      });
    } else {
      console.log("No collections found.");
    }
  });

collection
  .command("list-weavedb")
  .description("Lists collections from WeaveDB")
  .action(async () => {
    console.log("Fetching collections from WeaveDB...");
    const db = await weaveDB();
    const collections = await db.cget("communities"); // Assuming 'collection' is the right key
    console.log("collections", collections);
    // console.table(
    //   collections.reduce((acc: any, collection: any) => {
    //     acc[collection.id] = { name: collection.data.name }; // Update 'name' to correct property if different
    //     return acc;
    //   }, {})
    // );
  });

export default collection;
