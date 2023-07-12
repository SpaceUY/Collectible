import WeaveDB from "weavedb-sdk";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { magic } from "../lib/magic";
import { useUser } from "./UserContext";
import { useWeb3 } from "./Web3Context";
import { AddPost } from "../common/types/AddPost.type";
import { WeaveDBCollections } from "../common/enums/weave-db-collections.enum";
import { CommunityPost } from "../common/types/CommunityPost.type";
import { Benefit } from "../common/types/Benefit.type";
import { Collection } from "../common/types/Collection.type";

type WeaveDB = {
  addPost: (addPost: AddPost) => Promise<void>;
  getAllPosts: () => Promise<CommunityPost[] | void>;
  getCommunityPosts: (communityId: string) => Promise<CommunityPost[] | void>;
  checkUser: (address: string, name: string, avatar: string) => Promise<void>;
  addBenefit: (benefit: Omit<Benefit["data"], "creationDate">) => Promise<void>;
  addCollection: (
    collection: Omit<Collection["data"], "creationDate">,
  ) => Promise<void>;
};

type WeaveDBContextType = {
  db: any;
  weaveDB: WeaveDB;
};

declare global {
  interface Window {
    ethereum: {
      request({ method }: { method: string }): Promise<string[]>;
    };
  }
}

export const WeaveDBContext = createContext<WeaveDBContextType>({
  db: null,
  weaveDB: {} as WeaveDB,
});

export const useWeaveDB = () => useContext(WeaveDBContext);

export const WeaveDBProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user } = useUser();
  const { web3 } = useWeb3();
  const [db, setDb] = useState(null);

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

  // Initialize Web3
  const startWeaveDB = useCallback(async () => {
    console.log("AHEEEEM");

    const initializeWeaveDB = async () => {
      if (!web3) {
        return console.error("web3 must be connected and loaded");
      }
      if (!user?.isLoggedIn) {
        return console.error("web3 must be connected and loaded");
      }
      const db = new WeaveDB({
        customProvider: magic.rpcProvider,
        contractTxId: "ea8oIvy-BxcvJVJEdOrOjnU7OB3ttBfX4uVgQA90ntw",
      });

      await db.initializeWithoutWallet();
      setDb(db);
      console.log("Initialized DB successfully!", db);
      overwriteEthereum();
      console.log("window.ethereum overriten successfully!", window.ethereum);
    };
    initializeWeaveDB();
  }, []);

  const weaveDB = {
    addPost: async (addPost: AddPost) => {
      try {
        await db.add({ ...addPost, date: db.ts() }, WeaveDBCollections.POST);
      } catch (error) {
        console.log(error);
      }
    },

    getAllPosts: async (): Promise<CommunityPost[] | void> => {
      try {
        return await db.cget(WeaveDBCollections.POST);
      } catch (error) {
        console.log(error);
      }
    },

    getCommunityPosts: async (
      communityId: string,
    ): Promise<CommunityPost[] | void> => {
      try {
        return await db.cget(WeaveDBCollections.POST, communityId);
      } catch (error) {
        console.log(error);
      }
    },

    getAllCommunities: async () => {
      try {
        return await db.cget(WeaveDBCollections.BRAND);
      } catch (error) {}
    },

    checkUser: async (
      address: string,
      name: string,
      avatar: string,
    ): Promise<void> => {
      try {
        const user = await db.cget(
          WeaveDBCollections.USER,
          ["address"],
          ["address", "==", address],
        );

        if (!user) {
          await db.add({ address, name, avatar }, WeaveDBCollections.USER);
        }
      } catch (error) {
        console.log(error);
      }
    },

    addBenefit: async (benefit: Benefit["data"]) => {
      try {
        await db.add(
          { ...benefit, creationDate: db.ts() },
          WeaveDBCollections.BENEFIT,
        );
      } catch (error) {
        console.log(error);
      }
    },

    addCollection: async (collection: Collection["data"]) => {
      try {
        await db.add(
          { ...collection, creationDate: db.ts() },
          WeaveDBCollections.COLLECTION,
        );
      } catch (error) {
        console.log(error);
      }
    },

    getAllCollections: async (): Promise<Collection | void> => {
      try {
        return await db.cget(WeaveDBCollections.COLLECTION);
      } catch (error) {
        console.log(error);
      }
    },
  };

  useEffect(() => {
    startWeaveDB();
  }, []);

  return (
    <WeaveDBContext.Provider
      value={{
        db,
        weaveDB,
      }}
    >
      {children}
    </WeaveDBContext.Provider>
  );
};
