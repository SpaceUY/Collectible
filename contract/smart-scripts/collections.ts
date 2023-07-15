import { Command } from "commander";

// Import these functions from your existing scripts
import { uploadMetadata } from "../scripts/upload-metadata";
import { generateMerkleTree } from "../scripts/generate-merkle-tree";
import { deployCollection } from "../scripts/deploy-collection";

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
    await deployCollection(brandName, collectionName, symbol);

    console.log("Collection created successfully.");
  });

export default collection;
