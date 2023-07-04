import { Collection } from "../src/common/interfaces/collection-props.interface";
import { COLLECTIBLE_CARDS } from "./collectible-cards";

export const COLLECTIONS: Collection[] = [
  {
    id: "saddafgrsdgds",
    communityId: "metallica",
    name: "Epic collection",
    createdAt: "2023-03-24 14:05:49",
    description: "Some description about the collection and its images.",
    collectables: COLLECTIBLE_CARDS,
  },
  {
    id: "fgsdsdfgfdg",
    communityId: "nike",
    name: "The sport Collection",
    createdAt: "2023-02-24 14:05:49",
    description:
      "Some description extreme lalal about the collection and its images.",
    collectables: COLLECTIBLE_CARDS,
  },
];
