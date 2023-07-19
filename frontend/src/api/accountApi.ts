import { getAddressShortcut } from "utils/functions";
import Web3 from "web3";
import { Community, UserData, AlchemyNFT, Collection } from "../../../types";
import { getUserNFTsOnCollections } from "./alchemyApi";

export async function getUserData(
  web3: Web3,
  address: string,
): Promise<
  Omit<
    UserData,
    "collectibles" | "communityOwnerships" | "communityMemberships"
  >
> {
  try {
    /**
       @DEV Obtaining balance via await web3.eth.getBalance not currently working
    */

    let balance = "0";
    try {
      const balanceInWei = await web3.eth.getBalance(address);
      console.log("balance obtained in wei", balanceInWei);
      balance = web3.utils.fromWei(balanceInWei);
    } catch (error) {
      console.error(error);
    }

    // Truncate the user's address for display purposes
    const shortAddress = getAddressShortcut(address);
    console.log("Fetched user data!, address: ", address);
    return {
      isLoggedIn: true,
      loading: false,
      address,
      shortAddress,
      name: "User Name",
      balance,
    };
  } catch (error) {
    console.log("error in getUserData");
  }
}

export async function getUserChainData(
  web3: Web3,
  address: string,
  allCommunities: Community[],
  allCollections: Collection[],
  allCollectionsAddresses: string[],
): Promise<
  Omit<
    UserData,
    "isLoggedIn" | "loading" | "address" | "shortAddress" | "name" | "balance"
  >
> {
  try {
    // 1. Determine community ownerships
    const communityOwnerships = [];
    for (const community of allCommunities) {
      if (community.owners.includes(address)) {
        communityOwnerships.push(community.communityId);
      }
    }
    // 2. Get all the user collectibles
    /** /
      @DEV Note: the Alchemy NFT API only supports up to 20 collections to filter at a time
    **/
    const userNftsOnCollections = (await getUserNFTsOnCollections(
      address,
      allCollectionsAddresses,
    )) as unknown as AlchemyNFT[];

    // 3. Determine community memberships
    // 3.1 Get all the user Collectible Collections addresses
    const userCollectionsAddresses = userNftsOnCollections.map(
      (nft) => nft.contract.address as string,
    );

    // 3.2 Remove duplicates
    const uniqueUserCollectionsAddresses = Array.from(
      new Set(userCollectionsAddresses),
    );

    // 3.3 Get all the user NFTs on the collections
    const communityMemberships = [];
    for (const collectionAddress of uniqueUserCollectionsAddresses) {
      if (allCollectionsAddresses.includes(collectionAddress)) {
        const communityId = allCollections.find(
          (collection) => collection.address === collectionAddress,
        )?.communityId;
        communityMemberships.push(communityId);
      }
    }

    console.log("user nfts on collections", userNftsOnCollections);

    return {
      collectibles: userNftsOnCollections,
      communityOwnerships,
      communityMemberships,
    };
  } catch (error) {
    console.error("error in getUserChainData: ", error);
  }
}
