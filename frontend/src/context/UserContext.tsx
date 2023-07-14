import { useState, useEffect, createContext, useContext } from "react";
import { useWeb3 } from "./Web3Context";
import { magic } from "@/lib/magic";
import { getUserData } from "@/api/accountApi";
import { fetchMockedNFTs, fetchNFTs } from "@/api/nftApi";
import { useRouter } from "next/router";
import { UserData } from "../common/interfaces/user-data.interface";
import { Community } from "../common/types/Community.type";

const initialUserState: UserData = {
  loading: true,
  isLoggedIn: false,
  address: "",
  shortAddress: "",
  name: "",
  balance: "",
  refreshCollectibles: false,
  collectibles: [],
  communityMemberships: [],
  communityOwnerships: [],
};

// Define user context type
type UserContextType = {
  user: UserData;
  setUser: React.Dispatch<React.SetStateAction<UserData>> | null;
  connectUser: () => void;
  // connectBrand: () => void;
  disconnectUser: () => void;
};

// Create context with default values
const UserContext = createContext<UserContextType>({
  user: initialUserState,
  setUser: null,
  connectUser: () => {},
  // connectBrand: () => {},
  disconnectUser: () => {},
});

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);

// Provider component to wrap around components that need access to the context
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  // Get web3 and contract instances from Web3Context
  const { web3, contract, isAccountChanged, initializeWeb3 } = useWeb3();
  const [communityMemberships, setCommunityMemberships] = useState<Community[]>(
    [],
  );
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
    // Clear the user state
    setUser(initialUserState);

    // Re-initialize web3 instance to ensure correct provider is used
    await initializeWeb3();

    // Redirect to homepage
    router.push("/");
  };

  // 1. Get the user account when web3 instance is available
  useEffect(() => {
    const fetchData = async () => {
      if (!web3) return;
      setUser({ ...user, loading: true });
      const account = await web3.eth.getAccounts();
      if (account.length > 0) {
        const data = await getUserData(web3);
        console.log("data from getUserData", data);
        setUser(data);
      } else {
        setUser({ ...user, loading: false });
      }
    };

    fetchData();
  }, [web3, isAccountChanged]);

  // Function to fetch and update NFTs for the user
  const fetchAndUpdateNFTs = async () => {
    if (!user?.address) return;

    // setUser({ ...user, refreshCollectibles: true });

    try {
      // const res = await fetchNFTs(user.address, contract);

      const collectibles = await fetchMockedNFTs(user.address, contract);

      if (Array.isArray(collectibles)) {
        setUser({
          ...user,
          collectibles,
          // refreshCollectibles: false,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch and update NFTs when address or refreshCollectibles state changes
  useEffect(() => {
    fetchAndUpdateNFTs();
  }, [user?.address, user?.refreshCollectibles]);

  return (
    <UserContext.Provider
      value={{ user, setUser, connectUser, disconnectUser }}
    >
      {children}
    </UserContext.Provider>
  );
};
