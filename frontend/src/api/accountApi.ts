import { getAddressShortcut } from "utils/functions";
import Web3 from "web3";
import { Community, UserData, AlchemyNFT } from "../../../types";
import { getUserNFTsOnCollections } from "./alchemyApi";

const dev = "0xc0f2B485cFe95B3A1df92dA2966EeB46857fe2a6";
const dev2 = "0xc6f7E8DB9dE361bBF1Aa4fEff6Aa54a510449Fe1";
const dev3 = "0x228DBe53617f2a668079aDbaF9141FCB0a83BEaF";

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
    console.log("Fetching user data...");
    console.log("get user data being called with", address, web3);
    console.log("getting user balance");

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

    console.log("heyyy I have reached this point");

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
    // 2.1 Get all the collections from all the communities (WeaveDB)
    const allCollections = allCommunities.flatMap((community) =>
      community.collections.map((collection) => ({
        collectionAddress: collection.address.toLowerCase(),
        collectionName: collection.name,
        communityId: community.communityId,
      })),
    );

    // 2.2 Get all the collections addresses
    const allCollectionsAddresses = allCollections.map((collection) =>
      collection.collectionAddress.toLowerCase(),
    );

    // 2.3 Get all the user NFTs on the collections
    /** /
      @DEV Note: the Alchemy NFT API only supports up to 20 collections to filter at a time
    **/
    const userNftsOnCollections = (await getUserNFTsOnCollections(
      dev3,
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
          (collection) => collection.collectionAddress === collectionAddress,
        )?.communityId;
        communityMemberships.push(communityId);
      }
    }

    return {
      collectibles: userNftsOnCollections,
      communityOwnerships,
      communityMemberships,
    };
  } catch (error) {
    console.error("error in getUserChainData: ", error);
  }
}
