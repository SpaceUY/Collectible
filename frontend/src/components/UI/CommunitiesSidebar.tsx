import React, { useState } from "react";
import CommunityListItem from "./CommunityListItem";
import SearchBar from "./SearchBar";

const communities: {
  communityPicture: string;
  name: string;
}[] = [
  { communityPicture: "", name: "Random" },
  { communityPicture: "", name: "aja" },
  { communityPicture: "", name: "Jkak" },
];

const CommunitiesSidebar = () => {
  const [searchInput, setSearchInput] = useState("");

  const filteredCommunitites = communities.filter((community) =>
    community.name
      .toLocaleLowerCase()
      .includes(searchInput.toLocaleLowerCase()),
  );

  return (
    <aside className="fixed right-0 top-20 mx-5 mt-4 h-full w-64 rounded-lg bg-collectible-dark-purple px-3 py-4">
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
    </aside>
  );
};

export default CommunitiesSidebar;
