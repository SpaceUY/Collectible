import React, { useEffect, useState } from "react";
import CollectiblesReel from "../UI/CollectiblesReel";
import LoadingWheel from "../UI/LoadingWheel";
import { Community, CollectionWithNfts } from "../../../../types";
import { getCollectionNfts } from "@/api/alchemyApi";

interface CommunityCollectionsProps {
  community: Community;
}

const CommunityCollections = ({ community }: CommunityCollectionsProps) => {
  /** 
  @DEV To be saved in a state manager to avoid re-fetching on every page change
   */
  const [isLoading, setIsLoading] = useState(true);
  const [collectionsWithNfts, setCollectionsWithNfts] = useState<
    CollectionWithNfts[]
  >([]);

  useEffect(() => {
    const fetchCommunityCollections = async () => {
      const fetchedCollections = [];
      await Promise.all(
        community.collections.map(async (collection) => {
          const nfts = await getCollectionNfts(collection.address);
          if (nfts.length > 0) {
            fetchedCollections.push({ ...collection, nfts });
          }
        }),
      );

      setCollectionsWithNfts(fetchedCollections);
      setIsLoading(false);
    };
    fetchCommunityCollections();
  }, [community.collections]);

  return !isLoading ? (
    <div className="mb-40 flex flex-col gap-10">
      {collectionsWithNfts.map((collectionWithNfts) => (
        <CollectiblesReel
          key={collectionWithNfts.address}
          nfts={collectionWithNfts.nfts}
          headerText={collectionWithNfts.name}
        />
      ))}
    </div>
  ) : (
    <div className="h-56">
      <LoadingWheel />
    </div>
  );
};

export default CommunityCollections;
