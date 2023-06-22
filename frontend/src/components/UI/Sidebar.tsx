import React from "react";
import Image from "next/image";
import Button from "./Button";
import CommunityListItem from "./CommunityListItem";

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

interface SidebarProps {
  handleOpenConnectModal: () => void;
}

const Sidebar = ({ handleOpenConnectModal }: SidebarProps) => {
  return (
    <aside className="fixed left-0 top-20 mx-5 mt-4 h-full w-64 rounded-lg bg-collectible-dark-purple ">
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
            <CommunityListItem
              key={name}
              communityPicture={communityPicture}
              name={name}
            />
          ))}
        </ul>
        <Button action={handleOpenConnectModal}>Connect Wallet</Button>
      </div>
    </aside>
  );
};

export default Sidebar;
