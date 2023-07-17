import WeaveDB from "weavedb-sdk";
import React, { createContext, useContext, useEffect, useState } from "react";
import { magic } from "../lib/magic";
import { useUser } from "./UserContext";
import { useWeb3 } from "./Web3Context";
import { WeaveDBApi } from "@/api/weaveApi";
import { Community } from "../../../types";

type WeaveDBContextType = {
  db: WeaveDB;
  weaveDBApi: WeaveDBApi;
  allCommunities: Community[];
  loadingDB: boolean;
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
  loadingDB: true,
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

  const [loadingDB, setLoadingDB] = useState<boolean>(true);
  const [identity, setIdentity] = useState(null);

  /**
    @DEV Similar to the AuthSig, generate an Identity to be able to sign with the Magic Wallet
    This only needs to be done once per session, utile to avoid multiple signing
  */
  const signIdentity = async () => {
    if (!user?.isLoggedIn) {
      return alert("user must be connected in order to SignIdentity");
    }
    if (!web3) {
      return alert(
        "web3 must be connected and loaded in order to SignIdentity",
      );
    }
    if (!db) {
      return alert("db must be connected and loaded in order to SignIdentity");
    }
    const account = user?.address;
    try {
      const { identity } = await db.createTempAddress(account);
      setIdentity(identity);
      console.log("Identity created and signed succesfully!", identity);
    } catch (error) {
      console.error("Error creating temp address", error);
    }
  };

  // To be executed before writting calls towards WeaveDB, inside WeaveDBApi
  const checkOrSignIdentity = async () => {
    if (!identity) {
      console.log("Identity not signed, asking for identity signing...");
      await signIdentity();
    } else {
      console.log("Identity already signed", identity);
    }
  };

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

    const weaveDBApi = new WeaveDBApi(db, checkOrSignIdentity);

    await db.initializeWithoutWallet();

    setDb(db);
    console.log("Initialized DB successfully!", db);

    setWeaveDBApi(weaveDBApi);
    console.log("Initialized weaveDBApi successfully!", weaveDBApi);

    overwriteEthereum();
    console.log("window.ethereum overriten successfully!", window.ethereum);

    const allCommunities = await weaveDBApi.getAllCommunities();
    setAllCommunities(allCommunities);

    setLoadingDB(false);
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
        loadingDB,
      }}
    >
      {children}
    </WeaveDBContext.Provider>
  );
};
