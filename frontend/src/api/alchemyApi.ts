import { Network, Alchemy } from "alchemy-sdk";
import { CollectibleMetadata } from "../../../types";
import { generateMerkleProof } from "utils/functions";

// Optional Config object, but defaults to demo api-key and eth-mainnet.
const settings = {
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY, // Replace with your Alchemy API Key.
  network: Network.MATIC_MUMBAI, // Replace with your network.
};

const alchemy = new Alchemy(settings);

export const getUserNFTsOnCollections = async (
  address: string,
  collections: string[],
) => {
  const userNftsOnCollections = await alchemy.nft.getNftsForOwner(address, {
    contractAddresses: collections,
  });
  return userNftsOnCollections.ownedNfts;
};

export const getCollectionNfts = async (collectionAddress: string) => {
  const collectibles = await alchemy.nft.getNftsForContract(collectionAddress);
  return collectibles.nfts;
};

// custom function using Alchemy Pinata Cloud to gate tokenURIs
export const getTokenURI = async (
  tokenURI: string,
): Promise<CollectibleMetadata> => {
  const gatewayUri = tokenURI.replace(
    "ipfs://",
    process.env.NEXT_PUBLIC_ALCHEMY_IPFS_URL,
  );
  const response = await fetch(gatewayUri);
  const data = await response.json();
  return data;
};

// custom function using Alchemy Pinata Cloud to gate Merkle Trees and generate the proof
export const getMerkleProof = async (
  tokenId: string,
  merkleTreeCID: string,
) => {
  const merkleTreeGateway =
    process.env.NEXT_PUBLIC_ALCHEMY_IPFS_URL + merkleTreeCID;
  const rawMerkleTree = await fetch(merkleTreeGateway);
  const merkleTree = await rawMerkleTree.json();
  const merkleProof = generateMerkleProof(+tokenId, merkleTree);
  return merkleProof;
};
