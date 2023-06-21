import React from "react";
import Image from "next/image";
import Button from "../Button";
import CommunityCard from "./CommunityCard";

const defaultSidebarItems: { text: string; icon: string }[] = [
  { text: "Home", icon: "page-icons/home-icon.svg" },
  { text: "Explore", icon: "page-icons/glass-icon.svg" },
];

const communities: {
  communityPicture: string;
  name: string;
}[] = [
  { communityPicture: "", name: "Random" },
  { communityPicture: "", name: "Random" },
];

const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-20 mx-5 mt-2 h-full w-64 rounded-lg bg-collectible-dark-purple ">
      <ul className="mx-3 my-5">
        {defaultSidebarItems.map((itemList) => (
          <li key={itemList.text}>
            <a
              href="#"
              className="text-strong-gray-900 hover:text:text-su flex items-center rounded-lg p-2 "
            >
              <Image
                src={itemList.icon}
                width={22}
                height={22}
                alt="Collectible Logo"
              />
              <span className="ml-3 text-gray-medium hover:text-gray-strong">
                {itemList.text}
              </span>
            </a>
          </li>
        ))}
      </ul>

      <div className="mx-3 flex h-full flex-col content-end">
        <ul className="mb-8 space-y-5">
          {communities.map(({ communityPicture, name }) => (
            <CommunityCard
              key={name}
              communityPicture={communityPicture}
              name={name}
            />
          ))}
        </ul>
        <Button
          action={() => console.log("awdwa")}
          isFilled={false}
          isLarge={false}
          text="Connect Wallet"
        />
      </div>
    </aside>
  );
};

export default Sidebar;
