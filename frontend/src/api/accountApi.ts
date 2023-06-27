/*
  Helper function to collect all the desired connected user's data,
  both from Magic.link and the blockchain
*/
export async function getUserData(web3) {
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

    console.log("finished getuserdata");
    return {
      isLoggedIn: true,
      loading: false,
      address,
      balance,
      shortAddress,
      collectibles: undefined,
      refreshCollectibles: true,
    };
  } catch (error) {
    console.error("getUserData", error);
  }
}

export const getAddressShortcut = (address: string) => {
  const shortAddress = `${address.substring(0, 5)}...${address.substring(
    address.length - 4,
  )}`;

  return shortAddress;
};
