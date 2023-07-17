import { Command } from "commander";
import path from "path";
import fs from "fs";
import { weaveDB } from "../weavedb"; // Update the path accordingly
import { uploadMetadata } from "../scripts/upload-metadata";
import { generateMerkleTree } from "../scripts/generate-merkle-tree";
import { deployCollection } from "../scripts/deploy-collection";
import dotenv from "dotenv";
import { WeaveDBCommunity } from "../../types";

dotenv.config();

const collection = new Command("collection");

async function weaveDBCreateCollection(
  communityId: string,
  collectionName: string,
  collectionAddress: string
) {
  const db = await weaveDB();

  try {
    console.log("weaveDBCreateCollection called!");

    const community = await db.get("communities", communityId);
    const now = new Date();
    const creationDate = now.toLocaleString();

    const newCollection = {
      address: collectionAddress,
      communityId: communityId,
      creationDate: creationDate,
      name: collectionName,
    };

    // Add the new collection to the existing ones
    const updatedCollections = [...community.collections, newCollection];

    // Update the community document with the new collections array
    await db.update({ collections: updatedCollections }, "communities", communityId);
  } catch (error) {
    console.log(error);
  } finally {
    console.log("\nweaveDBCreateCollection finished successfully!");
  }
}

// Create: create collection, from metadata to deployment to weavedb update
collection
  .command("create <communityId> <collectionName> <description> <symbol> <nftCountStr>")
  .description("Generates all the elements necessary for a collection and deploys it")
  .action(async (communityId, collectionName, description, symbol, nftCountStr) => {
    console.log("Collection create called!");
    console.log(
      "\ncommunityId:",
      communityId,
      "\ncollectionName:",
      collectionName,
      "\ndescription:",
      description,
      "\nsymbol:",
      symbol,
      "\nnftCountStr:",
      nftCountStr
    );

    // Convert string to number
    const nftCount = parseInt(nftCountStr, 10);
    // Then check if it's a valid number
    if (isNaN(nftCount) || nftCount <= 0) {
      console.error("Invalid NFT count. Please provide a number greater than 0.");
      process.exit(1);
    }

    try {
      // 1. Upload Metadata
      console.log("\n1. Uploading metadata...");
      await uploadMetadata(communityId, collectionName, description, nftCount);

      // 2. Generate Merkle Tree
      console.log("\n2. Generating Merkle Tree from the Merkle values (leafs)...");
      await generateMerkleTree(communityId, collectionName);

      // 3. Deploy Collection
      console.log("\n3. Deploying collection contract...");
      const collectionAddress = await deployCollection(
        communityId,
        collectionName,
        symbol,
        nftCount
      );

      // 4. Upload collection to the WeaveDB community
      console.log("\n4. Uploadiing collection to the WeaveDB community...");
      await weaveDBCreateCollection(communityId, collectionName, collectionAddress);
    } catch (error) {
      console.log(error);
    } finally {
      console.log("\nCollection created, deployed and saved successfully!.");
    }
  });

// patch: Push created collection into WeaveDB if the collection is not already there
// Note: Only use this command if the collection creation in WeaveDB with create failed
// Or if the collection was created outside of the CLI
collection
  .command("patch <communityId> <collectionName> <collectionAddress>")
  .description("Push created collection into WeaveDB if the collection is not already there")
  .action(async (communityId, collectionName, collectionAddress) => {
    try {
      await weaveDBCreateCollection(communityId, collectionName, collectionAddress);
    } catch (error) {
      console.log(error);
    }
  });

// list-json: List all the collections from the saved collection deployments JSON
collection
  .command("list-json")
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
        console.log("Brand Name:", collection.communityId);
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

// list: List all the collections saved on WeaveDB
collection
  .command("list")
  .description("Lists collections from WeaveDB")
  .action(async () => {
    console.log("Fetching collections from WeaveDB...");
    const db = await weaveDB();
    const communities = await db.cget("communities"); // Assuming 'collection' is the right key
    // console.log("communities", 4communities);

    const collections = communities.flatMap(
      (community: WeaveDBCommunity) => community.data.collections
    );

    console.log("collections: ", collections);
  });

export default collection;
