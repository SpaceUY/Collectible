import WeaveDB from "weavedb-sdk";
import React, { createContext, useContext, useEffect, useState } from "react";
import { magic } from "../lib/magic";
import { useUser } from "./UserContext";
import { useWeb3 } from "./Web3Context";
import { WeaveDBApi } from "@/api/weaveApi";
import { Community, Collection, CollectionWithNfts } from "../../../types";
import { getCollectionNfts } from "@/api/alchemyApi";
import { NEW_COLLECTIONS_LENGTH } from "../../constants";

type WeaveDBContextType = {
  db: WeaveDB;
  weaveDBApi: WeaveDBApi;
  allCommunities: Community[];
  allCollections: Collection[];
  allCollectionsAddresses: string[];
  newCollections: CollectionWithNfts[];
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
  allCollections: [],
  allCollectionsAddresses: [],
  newCollections: [],
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
  const [allCollections, setAllCollections] = useState<Collection[]>([]);
  const [allCollectionsAddresses = [], setAllCollectionsAddresses] = useState<
    string[]
  >([]);
  const [newCollections, setNewCollections] = useState<CollectionWithNfts[]>(
    [],
  );

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

    const allCollections = allCommunities.flatMap((community) =>
      community.collections.map((collection) => ({
        address: collection.address.toLowerCase(),
        name: collection.name,
        communityId: community.communityId,
        creationDate: collection.creationDate,
        availableMetadataResources: collection.availableMetadataResources,
      })),
    );
    console.log("allCollections", allCollections);
    setAllCollections(allCollections);

    const allCollectionsAddresses = allCollections.map((collection) =>
      collection.address.toLowerCase(),
    );
    setAllCollectionsAddresses(allCollectionsAddresses);

    // Take into account that a request to the alchemy API is made for each collection
    let newCollections = JSON.parse(JSON.stringify(allCollections));
    newCollections = newCollections
      .sort((a, b) => Date.parse(b.creationDate) - Date.parse(a.creationDate))
      .slice(0, NEW_COLLECTIONS_LENGTH);

    // Query the alchemy API to get the collection metadata
    const promises = newCollections.map((collection) =>
      getCollectionNfts(collection.address),
    );
    const nftData = await Promise.all(promises);

    newCollections = newCollections.map((collection, index) => {
      collection.nfts = nftData[index];
      return collection;
    });
    console.log("new collections", newCollections);
    setNewCollections(newCollections);

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
    fetchUserChainData(allCommunities, allCollections, allCollectionsAddresses);

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
        allCollections,
        allCollectionsAddresses,
        newCollections,
        loadingDB,
      }}
    >
      {children}
    </WeaveDBContext.Provider>
  );
};
