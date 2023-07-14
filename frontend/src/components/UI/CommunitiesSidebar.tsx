import React, { useState } from "react";
import CommunityListItem from "./CommunityListItem";
import SearchBar from "./SearchBar";
import { COMMUNITY_LIST } from "../../../mock/communities";
import { useCollectible } from "../../context/CollectibleContext";

const CommunitiesSidebar = () => {
  const [searchInput, setSearchInput] = useState("");
  const { communities } = useCollectible();

  const filteredCommunitites = communities.filter((community) =>
    community.data.name
      .toLocaleLowerCase()
      .includes(searchInput.toLocaleLowerCase()),
  );

  return (
    <>
      <SearchBar
        query={searchInput}
        handleQuery={setSearchInput}
        variant="medium-purple"
      />

      <div className="mt-6 flex h-full flex-col content-end">
        <ul className="mb-8 space-y-5">
          {filteredCommunitites.map((community) => (
            <CommunityListItem key={community.id} community={community} />
          ))}
        </ul>
      </div>
    </>
  );
};

export default CommunitiesSidebar;
