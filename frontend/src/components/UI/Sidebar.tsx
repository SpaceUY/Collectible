import React from "react";
import Image from "next/image";
import Button from "./Button";
import CommunityListItem from "./CommunityListItem";
import { useUser } from "@/context/UserContext";
import Link from "next/link";
import { useModal } from "@/context/ModalContext";
import { USER_COMMUNITY_LIST } from "mock/community";
import { BiLogOut } from "react-icons/bi";

const defaultSidebarItems: { text: string; icon: string; href: string }[] = [
  { text: "Home", icon: "/page-icons/home-icon.svg", href: "/" },
  { text: "Explore", icon: "/page-icons/glass-icon.svg", href: "/" },
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
        <div className="flex flex-col px-1">
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

      {user?.isLoggedIn && (
        <Link
          className="fixed bottom-6 flex items-center justify-center gap-3"
          href={`/profile/${user?.address}`}
        >
          <div className="rounded-full border-[1px] bg-gray-strong">
            <Image
              /** 
               @DEV remove opacity-0 to display image
               **/
              className="h-12 w-12 rounded-full border-gray-strong opacity-0"
              src={"collectible-logo.svg"}
              width={50}
              height={50}
              alt="Collectible Logo"
            />
          </div>
          <span className="flex flex-col mr-6">
            <p className="text-gray-strong opacity-50">userName</p>
            <p className="text-sm text-gray-strong opacity-50">
              {user?.shortAddress}
            </p>
          </span>
          {!user?.loading && user?.isLoggedIn && (
            <button
              className="text-2xl text-gray-medium "
              onClick={disconnectUser}
            >
              <BiLogOut />
            </button>
          )}
        </Link>
      )}

      <div className=" flex  items-center justify-center self-center justify-self-end ">
        {!user?.loading && !user?.isLoggedIn && (
          <Button action={handleOpenConnectModal}>Connect Account</Button>
        )}
        {user?.loading && <Button action={() => {}}>Loading</Button>}
      </div>
    </>
  );
};

export default Sidebar;
