import { useState, useEffect, createContext, useContext } from "react";
import { useWeb3 } from "./Web3Context";
import { magic } from "@/lib/magic";
import { getUserData } from "@/api/accountApi";
import { fetchNFTs } from "@/api/nftApi";
import { useRouter } from "next/router";

// Define custom user data type
interface UserData {
  address?: string;
  shortAddress?: string;
  balance?: string;
  collectibles?: string[];
  isLoggedIn?: boolean;
  loading?: boolean;
  refreshCollectibles?: boolean;
  tokenIdForModal?: number;
}

// Define user context type
type UserContextType = {
  user: UserData | null;
  setUser: React.Dispatch<React.SetStateAction<UserData | undefined>> | null;
  connectUser: () => void;
  connectBrand: () => void;
  disconnectUser: () => void;
};

// Create context with default values
const UserContext = createContext<UserContextType>({
  user: null,
  setUser: null,
  connectUser: () => {},
  connectBrand: () => {},
  disconnectUser: () => {},
});

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);

// Provider component to wrap around components that need access to the context
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  // Get web3 and contract instances from Web3Context
  const { web3, contract, isAccountChanged, initializeWeb3 } = useWeb3();
  const router = useRouter();

  const initialUserState = {
    loading: true,
  };
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

  /**  
   @dev Brand connection to be handled on WeaveDV @TBD
  **/
  const connectBrand = async () => {
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
    setUser(null);

    // Re-initialize web3 instance to ensure correct provider is used
    await initializeWeb3();

    // Redirect to homepage
    router.push("/");
  };

  // 1. Get the user account when web3 instance is available
  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching user data");
      if (!web3) return;
      setUser({ loading: true });

      const account = await web3.eth.getAccounts();
      console.log(account);
      if (account.length > 0) {
        const data = await getUserData(web3);
        setUser(data);
      } else {
        setUser({ loading: false });
      }
    };

    fetchData();
  }, [web3, isAccountChanged]);

  // Function to fetch and update NFTs for the user
  const fetchAndUpdateNFTs = async () => {
    if (!user?.address || !user?.refreshCollectibles) return;

    setUser({ ...user, refreshCollectibles: true });

    try {
      const res = await fetchNFTs(user.address, contract);

      if (Array.isArray(res)) {
        setUser({
          ...user,
          collectibles: res.reverse(),
          refreshCollectibles: false,
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
      value={{ user, setUser, connectUser, connectBrand, disconnectUser }}
    >
      {children}
    </UserContext.Provider>
  );
};
