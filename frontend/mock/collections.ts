import { Collection } from "../src/common/interfaces/collection-props.interface";
import {
  COLLECTIBLE_CARDS_01,
  COLLECTIBLE_CARDS_02,
  COLLECTIBLE_CARDS_03,
} from "./collectible-cards";

export const COLLECTIONS: Collection[] = [
  {
    id: "collection-03",
    communityId: "metallica",
    name: "Classic Metallica Albums",
    createdAt: "2023-01-24 14:05:49",
    description: "Some description about the collection and its images.",
    collectibles: COLLECTIBLE_CARDS_03,
  },
  {
    id: "collection-02",
    communityId: "metallica",
    name: "Metallic Funkos",
    createdAt: "2023-07-24 14:05:49",
    description: "Some description about the collection and its images.",
    collectibles: COLLECTIBLE_CARDS_02,
  },

  {
    id: "collection-01",
    communityId: "nike",
    name: "Bored Ape Yacht Club",
    createdAt: "2023-05-24 14:05:49",
    description:
      "Some description extreme lalal about the collection and its images.",
    collectibles: COLLECTIBLE_CARDS_01,
  },
];
