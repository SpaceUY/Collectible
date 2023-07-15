import WeaveDB from "weavedb-sdk";
import React, { createContext, useContext, useEffect, useState } from "react";
import { magic } from "../lib/magic";
import { useUser } from "./UserContext";
import { useWeb3 } from "./Web3Context";
import { WeaveDBApi } from "@/api/weaveApi";
import { Community } from '../common/types';

type WeaveDBContextType = {
  db: WeaveDB;
  weaveDBApi: WeaveDBApi;
  allCommunities: Community[];
};

/**
 @DEV Workaroud to inject and simulate ethereum in the browser
 When working with another wallet provider than Metamask (as MagicLink SDK)
 */
declare global {
  interface Window {
    ethereum: {
      request({ method }: { method: string }): Promise<string[]>;
    };
  }
}

export const WeaveDBContext = createContext<WeaveDBContextType>({
  db: null,
  weaveDBApi: {} as WeaveDBApi,
  allCommunities: [],
});

export const useWeaveDB = () => useContext(WeaveDBContext);

export const WeaveDBProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user, fetchUserChainData } = useUser();
  const { web3 } = useWeb3();
  const [db, setDb] = useState(null);
  const [weaveDBApi, setWeaveDBApi] = useState(null);
  const [allCommunities, setAllCommunities] = useState<Community[]>([]);

  const overwriteEthereum = () => {
    window.ethereum = {
      request: async ({ method }) => {
        switch (method) {
          case "eth_requestAccounts":
            return [user?.address];
          case "eth_accounts":
            return [user?.address];
          default:
            return null;
        }
      },
    };
  };

  const startWeaveDB = async () => {
    console.log("startWeaveDB called");
    if (!web3) {
      return console.error(
        "web3 must be connected and loaded to run startWeaveDB",
      );
    }
    const db = new WeaveDB({
      customProvider: magic.rpcProvider,
      contractTxId: process.env.NEXT_PUBLIC_WEAVEDB_CONTRACT_TX_ID,
    });

    const weaveDBApi = new WeaveDBApi(db);

    await db.initializeWithoutWallet();

    setDb(db);
    console.log("Initialized DB successfully!", db);

    setWeaveDBApi(weaveDBApi);
    console.log("Initialized weaveDBApi successfully!", weaveDBApi);

    overwriteEthereum();
    console.log("window.ethereum overriten successfully!", window.ethereum);

    const allCommunities = await weaveDBApi.getAllCommunities();
    setAllCommunities(allCommunities);
    console.log("allCommunities", allCommunities);
  };

  useEffect(() => {
    if (!web3) {
      return console.error(
        "web3 must be connected and loaded to run fetchUserChainData",
      );
    }
    if (!user?.isLoggedIn) {
      return console.error("user must be logged in to run fetchUserChainData");
    }
    if (!allCommunities) {
      return console.error(
        "allCommunities must be loaded to run fetchUserChainData",
      );
    }
    fetchUserChainData(allCommunities);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [web3, user?.isLoggedIn, allCommunities]);

  useEffect(() => {
    startWeaveDB();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [web3]);

  return (
    <WeaveDBContext.Provider
      value={{
        db,
        weaveDBApi,
        allCommunities,
      }}
    >
      {children}
    </WeaveDBContext.Provider>
  );
};
