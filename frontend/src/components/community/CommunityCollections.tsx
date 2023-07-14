import React, { useState } from "react";
import { COLLECTIONS } from "../../../mock/collections";
import CollectiblesReel from "../UI/CollectiblesReel";
import { Community } from "../../common/types/Community.type";
import { Collection } from "../../common/types/Collection.type";
import LoadingWheel from "../UI/LoadingWheel";

const CommunityCollections = ({
  community,
  collections,
}: {
  community: Community;
  collections: Collection[];
}) => {
  const [isLoading, setIsLoading] = useState(false);

  // TODO fetch by id

  return !isLoading ? (
    <div className="mb-40 flex flex-col gap-10">
      {collections.map((collection) => (
        <>
          <CollectiblesReel
            key={collection.id}
            collectibleCards={[]} // TODO
            headerText={collection.data.name}
          />
        </>
      ))}
    </div>
  ) : (
    <div className="h-56">
      <LoadingWheel />
    </div>
  );
};

export default CommunityCollections;
