import { Command } from "commander";
import community from "./smart-scripts/community";
import collection from "./smart-scripts/collection";
import collectible from "./smart-scripts/collectible";

const program = new Command();
program
  .version("0.1.0")
  .addCommand(community)
  .addCommand(collection)
  .addCommand(collectible)
  .parse(process.argv);
