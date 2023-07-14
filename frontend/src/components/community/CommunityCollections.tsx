import React, { useState } from "react";
import { COLLECTIONS } from "../../../mock/collections";
import CollectiblesReel from "../UI/CollectiblesReel";
import { Community } from "../../common/types/Community.type";
import { Collection } from "../../common/types/Collection.type";

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
      {collections
        // .sort((a, b) => {
        //   return (
        //     new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        //   );
        // })
        .map((collection) => (
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
    <> TODO LOADING wheel or skeleton? </>
  );
};

export default CommunityCollections;
