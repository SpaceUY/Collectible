import { Network, Alchemy } from "alchemy-sdk";

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
  console.log("getNftsForOwner(), ", userNftsOnCollections);
  return userNftsOnCollections.ownedNfts;
};

export const getCollectionNfts = async (collectionAddress: string) => {
  const collectibles = await alchemy.nft.getNftsForContract(collectionAddress);
  console.log("getNftsForContract(), ", collectibles);
  return collectibles.nfts;
};
