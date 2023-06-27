import React, { useState } from "react";
import CommunityListItem from "./CommunityListItem";
import SearchBar from "./SearchBar";
import { COMMUNITY_LIST } from "../../../mock/community";
import { useRouter } from "next/router";

const CommunitiesSidebar = () => {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");

  const filteredCommunitites = COMMUNITY_LIST.filter((community) =>
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
          {filteredCommunitites.map(({ communityPicture, name }) => (
            <CommunityListItem
              key={name}
              communityPicture={communityPicture}
              name={name}
            />
          ))}
        </ul>
      </div>
    </>
  );
};

export default CommunitiesSidebar;
