import React, { createContext, useContext, useEffect, useState } from "react";
import { useWeaveDB } from "./WeaveDBContext";
import { CommunityPost } from "../common/types/CommunityPost.type";
import { Collection } from "../common/types/Collection.type";
import { Community } from "../common/types/Community.type";
import { Benefit } from "../common/types/Benefit.type";

type CollectibleContextType = {
  communities: Community[];
  posts: CommunityPost[];
  collections: Collection[];
  benefits: Benefit[];
  fetchHomeData: () => Promise<void>;
};

const CollectibleContext = createContext<CollectibleContextType>({
  communities: [],
  posts: [],
  collections: [],
  benefits: [],
  fetchHomeData: async () => {},
});

export const useCollectible = () => useContext(CollectibleContext);

export const CollectibleProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { weaveDB } = useWeaveDB();
  const [communities, setCommunities] = useState<Community[]>([]);
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [benefits, setBenefits] = useState<Benefit[]>([]);

  const getAllCommunities = async () => {
    const communities = await weaveDB.getAllCommunities();
    if (communities) setCommunities(communities);
  };

  const getAllPosts = async () => {
    const posts = await weaveDB.getAllPosts();
    if (posts) setPosts(posts);
  };

  const getAllCollections = async () => {
    const collections = await weaveDB.getAllCollections();
    if (collections) setCollections(collections);
  };

  const fetchHomeData = async () => {
    await Promise.all([
      getAllCommunities(),
      getAllPosts(),
      getAllCollections(),
    ]);
  };

  useEffect(() => {
    if (weaveDB) {
      fetchHomeData();
    }
  }, [weaveDB]);

  return (
    <CollectibleContext.Provider
      value={{ communities, posts, collections, benefits, fetchHomeData }}
    >
      {children}
    </CollectibleContext.Provider>
  );
};
