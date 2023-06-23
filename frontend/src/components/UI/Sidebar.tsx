import React from "react";
import Image from "next/image";
import Button from "./Button";
import CommunityListItem from "./CommunityListItem";
import { useUser } from "@/context/UserContext";
import Link from "next/link";
import { useModal } from "@/context/ModalContext";

const defaultSidebarItems: { text: string; icon: string; href: string }[] = [
  { text: "Home", icon: "/page-icons/home-icon.svg", href: "/" },
  { text: "Explore", icon: "/page-icons/glass-icon.svg", href: "/explore" },
];

const communities: {
  communityPicture: string;
  name: string;
}[] = [
  { communityPicture: "", name: "Random1" },
  { communityPicture: "", name: "Random2" },
];


const Sidebar = () => {
  const { user, disconnectUser } = useUser();
  const { handleOpenConnectModal } = useModal();
  return (
    <aside className="fixed left-0 top-20 mx-5 mt-4 h-full w-64 rounded-lg bg-collectible-dark-purple ">
      <ul className="mx-3 my-5">
        {defaultSidebarItems.map((itemList) => (
          <li  key={itemList.text}>
            <Link
             href={itemList.href}
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
            </Link>
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
        {!user?.loading && !user?.isLoggedIn && (
          <Button action={handleOpenConnectModal}>Connect Account</Button>
        )}
        {!user?.loading && user?.isLoggedIn && (
          <Button action={disconnectUser}>Disconnect</Button>
        )}
        {user?.loading && <Button action={() => {}}>Loading</Button>}
      </div>
    </aside>
  );
};

export default Sidebar;
