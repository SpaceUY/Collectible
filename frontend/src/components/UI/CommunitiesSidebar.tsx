import React, { useState } from "react";
import CommunityListItem from "./CommunityListItem";
import SearchBar from "./SearchBar";
import { useWeaveDB } from "@/context/WeaveDBContext";

const CommunitiesSidebar = () => {
  const [searchInput, setSearchInput] = useState("");

  const { allCommunities } = useWeaveDB();
  const filteredCommunitites = allCommunities.filter((community) =>
    community.name
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
            <CommunityListItem
              key={community.communityId}
              communityId={community.communityId}
            />
          ))}
        </ul>
      </div>
    </>
  );
};

export default CommunitiesSidebar;
