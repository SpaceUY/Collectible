import { getAddressShortcut } from "utils/functions";
import { UserData } from "../common/interfaces/user-data.interface";
import Web3 from "web3";
import { CollectibleAbi } from "../abi";
import { Community } from "../../../types";
import { testAlchemy } from "./alchemyApi";

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

    // Get the user's balance
    const balanceInWei = await web3.eth.getBalance(address);
    const balance = web3.utils.fromWei(balanceInWei);

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
    console.log("Fetching user chain data...");
    console.log("getUserChainData, allCommunities: ", allCommunities);

    // get all the collection addresses given the all communities
    const collections = allCommunities.flatMap((community) =>
      community.collections.map((collection) => ({
        collectionAddress: collection.address,
        collectionName: collection.name,
        communityId: community.communityId,
      })),
    );

    console.log("getUserChainData, allCollections: ", collections);

    // Fetch the number of NFTs this user owns in each Collection Contract
    const collectibles = [];
    for (const collection of collections) {
      const contract = new web3.eth.Contract(
        CollectibleAbi as any,
        collection.collectionAddress,
      );

      console.log(
        "Fetching Collectible Collection at address",
        collection.collectionAddress,
      );
      // Fetch the number of NFTs this user owns in this contract
      const balance = await contract.methods.balanceOf(address).call();

      // Add the collection details and the number of NFTs to the collectibles array
      collectibles.push({
        ...collection,
        balance: balance.toString(), // Convert from BigNumber to string
      });
    }

    console.log("Balanced Collectibles: ", collectibles);

    // Determine community ownerships
    const communityOwnerships = [];
    for (const community of allCommunities) {
      if (community.owners.includes(address)) {
        communityOwnerships.push(community.communityId);
      }
    }
    console.log("User communityOwnerships", communityOwnerships);

    // Determine community memberships
    const communityMemberships = [];
    for (const collectible of collectibles) {
      if (
        collectible.balance > 0 &&
        !communityMemberships.includes(collectible.communityId)
      ) {
        communityMemberships.push(collectible.communityId);
      }
    }
    console.log("User communityMemberships", communityMemberships);

    // TODO: obtain user tokens, but this could be done at his profile page
    const dev = "0xc0f2B485cFe95B3A1df92dA2966EeB46857fe2a6";
    const dev2 = "0xc6f7E8DB9dE361bBF1Aa4fEff6Aa54a510449Fe1";
    const dev3 = "0x228DBe53617f2a668079aDbaF9141FCB0a83BEaF";
    testAlchemy(dev2);

    return {
      collectibles: [],
      communityOwnerships,
      communityMemberships,
    };
  } catch (error) {
    console.error("error in getUserChainData: ", error);
  }
}
