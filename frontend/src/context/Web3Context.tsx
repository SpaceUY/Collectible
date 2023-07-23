import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import Web3 from "web3";
import { magic } from "../lib/magic";

type Web3ContextType = {
  web3: Web3 | null;
  initializeWeb3: () => void;
};

const Web3Context = createContext<Web3ContextType>({
  web3: null,
  initializeWeb3: () => {},
});

export const useWeb3 = () => useContext(Web3Context);

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  const [web3, setWeb3] = useState<Web3 | null>(null);

  const initializeWeb3 = useCallback(async () => {
    try {
      const provider = await magic.wallet.getProvider();
      const web3Instance = new Web3(provider);
      provider.on("accountsChanged", async () => {
        alert("Account changed, handle this case appropriately");
      });
      provider.on("chainChanged", async () => {
        alert("Chain changed, handle this case appropriately");
      });

      setWeb3(web3Instance);
    } catch (error) {
      console.error("Failed to initialize web3 or contract", error);
    }
  }, []);

  useEffect(() => {
    initializeWeb3();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Web3Context.Provider
      value={{
        web3,
        initializeWeb3,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};
