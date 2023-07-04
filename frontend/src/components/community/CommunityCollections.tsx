import React, { useState } from "react";
import { COLLECTIONS } from "../../../mock/collections";
import CollectiblesReel from "../UI/CollectiblesReel";

const CommunityCollections = ({ communityId }: { communityId: string }) => {
  const [isLoading, setIsLoading] = useState(false);

  // TODO fetch by id
  const collectionsById = COLLECTIONS.filter(
    (collection) => collection.communityId === communityId,
  );

  return !isLoading ? (
    <div className="flex flex-col gap-10">
      {collectionsById
        .sort((a, b) => {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        })
        .map((collection) => (
          <>
            <CollectiblesReel
              key={collection.name}
              collectibleCards={collection.collectibles}
              headerText={collection.name}
            />
          </>
        ))}
    </div>
  ) : (
    <> TODO LOADING wheel or skeleton? </>
  );
};

export default CommunityCollections;
