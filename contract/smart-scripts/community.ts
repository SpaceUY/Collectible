import { Command } from "commander";
import dotenv from "dotenv";
import { weaveDB } from "../weavedb";
import { Community } from "../../types";

dotenv.config();

const community = new Command("community");

// Create: create community on weavedb
community
  .command("create <communityId> <communityName> <description> <owner>")
  .description("Creates a community on weavedb")
  .action(async (communityId, communityName, description, owner) => {
    try {
      const db = await weaveDB();
      const now = new Date();
      const creationDate = now.toLocaleString();
      const existingCommunity = await db.get("communities", communityId);

      if (existingCommunity) {
        console.log(`A community with the id ${communityId} already exists!`);
        return;
      }

      const newCommunity: Community = {
        communityId: communityId,
        name: communityName,
        description: description,
        owners: [owner],
        collections: [],
        posts: [],
        benefits: [],
        picture: "",
        coverColor: "",
        creationDate: creationDate,
      };

      // Warning: Using 'db.set', the communityId communities entry will be overwritten if it already exists
      const community = await db.set(newCommunity, "communities", communityId);
    } catch (error) {
      console.log(error);
    } finally {
      console.log("\nweaveDBCreateCommunity finished successfully!");
    }
  });

// list
community
  .command("list")
  .description("Lists all the communities on weavedb")
  .action(async () => {
    const db = await weaveDB();
    const communities = await db.get("communities");
    console.log("communities :", communities);
  });

export default community;
