import { getAddressShortcut } from "utils/functions";
import { UserData } from "../common/interfaces/user-data.interface";
import Web3 from "web3";
import { Community } from "../common/types";
import { CollectibleAbi } from "../abi";


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

    console.log("collections: ", collections);

    const collectibles = [];

    for (const collection of collections) {
      const contract = new web3.eth.Contract(
        CollectibleAbi as any,
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

    console.log('collectibles: ', collectibles)

    // TODO: determine community ownerships and memberships

    // TODO: obtain user tokens, but this could be done at his profile page

    return {
      collectibles,
      communityOwnerships: [],
      communityMemberships: [],
    };
  } catch (error) {
    console.error("error in getUserChainData: ", error);
  }
}
