import { useState, useEffect, createContext, useContext } from "react";
import { useWeb3 } from "./Web3Context";
import { magic } from "@/lib/magic";
import { getUserChainData, getUserData } from "@/api/accountApi";
import { useRouter } from "next/router";
import { Community, UserData, Collection } from "../../types";

const initialUserState: UserData = {
  loading: true,
  isLoggedIn: false,
  address: "",
  shortAddress: "",
  name: "",
  balance: "",
  collectibles: [],
  communityMemberships: [],
  communityOwnerships: [],
};

type UserContextType = {
  user: UserData;
  connectUser: () => void;
  disconnectUser: () => void;
  fetchUserChainData: (
    allCommunities: Community[],
    allCollections: Collection[],
    allCollectionAddreses: string[],
  ) => Promise<void>;
};

// Create context with default values
const UserContext = createContext<UserContextType>({
  user: initialUserState,
  connectUser: () => {},
  disconnectUser: () => {},
  fetchUserChainData: () => Promise.resolve(),
});

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);

// Provider component to wrap around components that need access to the context
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  // Get web3 and contract instances from Web3Context
  const { web3, initializeWeb3 } = useWeb3();
  const router = useRouter();

  // State to hold the user data
  const [user, setUser] = useState<UserData>(initialUserState);

  /**  
   @dev User connection to be handled on WeaveDV @TBD
  **/
  const connectUser = async () => {
    try {
      // Attempt to connect with the user's wallet using Magic's UI
      await magic.wallet.connectWithUI();
      // If the wallet connection is successful, initialize web3 instance
      await initializeWeb3();
    } catch (error) {
      // Log any errors that occur during the login process
      console.error("handleLogin", error);
    }
  };

  const disconnectUser = async () => {
    // Disconnect from magic
    await magic.user.logout();
    console.log("disconnected from Magic");

    // Redirect to homepage
    router.push("/");

    // refresh hard
    window.location.reload();
  };

  const fetchUserData = async () => {
    if (!web3) {
      return console.error(
        "web3 must be connected and loaded to fetch the user data",
      );
    }
    const accounts = await web3.eth.getAccounts();
    const address = accounts[0];
    if (address) {
      try {
        const userData = await getUserData(web3, address);
        setUser({
          ...user,
          address: userData.address,
          shortAddress: userData.shortAddress,
          name: userData.name,
          balance: userData.balance,
          // loading: userData.loading,
          // isLoggedIn: userData.isLoggedIn,
        });
      } catch (e) {
        console.log(e);
      }
    } else {
      setUser({ ...user, loading: false });
    }
  };

  const fetchUserChainData = async (
    allCommunities: Community[],
    allCollections: Collection[],
    allCollectionAddreses: string[],
  ) => {
    const userChainData = await getUserChainData(
      web3,
      user.address,
      allCommunities,
      allCollections,
      allCollectionAddreses,
    );
    console.log("obtained user chain data");
    setUser({
      ...user,
      collectibles: userChainData.collectibles,
      communityMemberships: userChainData.communityMemberships,
      communityOwnerships: userChainData.communityOwnerships,
      isLoggedIn: true, // edited
      loading: false, // edited
    });
  };

  // 1. Get the user account when web3 instance is available
  useEffect(() => {
    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [web3]);

  return (
    <UserContext.Provider
      value={{ user, connectUser, disconnectUser, fetchUserChainData }}
    >
      {children}
    </UserContext.Provider>
  );
};
