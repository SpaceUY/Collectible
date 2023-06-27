import React from "react";
import Image from "next/image";
import Button from "./Button";
import CommunityListItem from "./CommunityListItem";
import { useUser } from "@/context/UserContext";
import Link from "next/link";
import { useModal } from "@/context/ModalContext";
import { USER_COMMUNITY_LIST } from "mock/community";

const defaultSidebarItems: { text: string; icon: string; href: string }[] = [
  { text: "Home", icon: "/page-icons/home-icon.svg", href: "/" },
  { text: "Explore", icon: "/page-icons/glass-icon.svg", href: "/explore" },
];

const Sidebar = () => {
  const { user, disconnectUser } = useUser();
  const { handleOpenConnectModal } = useModal();
  return (
    <>
      <ul className="mb-4">
        {defaultSidebarItems.map((itemList) => (
          <li key={itemList.text}>
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

      {user?.isLoggedIn && (
        <div className="px-1 flex flex-col content-end">
          <ul className="mb-8 space-y-5">
            {USER_COMMUNITY_LIST.map(({ communityPicture, name }) => (
              <CommunityListItem
                key={name}
                communityPicture={communityPicture}
                name={name}
              />
            ))}
          </ul>
        </div>
      )}

      <div className="mx-3 flex flex-col">
        {!user?.loading && !user?.isLoggedIn && (
          <Button action={handleOpenConnectModal}>Connect Account</Button>
        )}
        {!user?.loading && user?.isLoggedIn && (
          <Button action={disconnectUser}>Disconnect</Button>
        )}
        {user?.loading && <Button action={() => {}}>Loading</Button>}
      </div>
    </>
  );
};

export default Sidebar;
