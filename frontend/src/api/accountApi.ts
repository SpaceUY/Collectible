import { UserData } from "../common/interfaces/user-data.interface";
import {
  USER_COMMUNITY_MEMBERSHIP,
  USER_COMMUNITY_OWNERSHIP,
} from "mock/communities";

/*
  Helper function to collect all the desired connected user's data,
  both from Magic.link and the blockchain
*/

export async function getUserData(web3): Promise<UserData> {
  const communityMemberships = USER_COMMUNITY_MEMBERSHIP;
  const communityOwnerships = USER_COMMUNITY_OWNERSHIP;

  try {
    console.log("Fetching user data...");
    // Get the user's address
    const [address] = await web3.eth.getAccounts();
    console.log("address and balances obtained!");

    // Get the user's balance
    const balanceInWei = await web3.eth.getBalance(address);
    const balance = web3.utils.fromWei(balanceInWei);

    // Truncate the user's address for display purposes
    const shortAddress = getAddressShortcut(address);

    /** 
    @DEV Get user memberOf and ownerOf communities
  */

    console.log("finished getuserdata");
    return {
      isLoggedIn: true,
      loading: false,
      name: "User Name",
      address,
      balance,
      shortAddress,
      collectibles: undefined,
      refreshCollectibles: true,
      communityMemberships,
      communityOwnerships,
    };
  } catch (error) {
    console.log("error in getUserData");
    // console.error("getUserData", error);
    return {
      isLoggedIn: true,
      loading: false,
      name: "Fake User",
      address: "0x0000000000000000000000001",
      balance: "0",
      shortAddress: "0x000...0001",
      collectibles: undefined,
      refreshCollectibles: true,
      communityMemberships,
      communityOwnerships,
    };
  }
}

export const getAddressShortcut = (address: string) => {
  const shortAddress = `${address.substring(0, 5)}...${address.substring(
    address.length - 4,
  )}`;

  return shortAddress;
};
