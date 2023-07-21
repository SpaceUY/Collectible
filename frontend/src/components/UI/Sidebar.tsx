import React from "react";
import Image from "next/image";
import Button from "./Button";
import CommunityListItem from "./CommunityListItem";
import { useUser } from "@/context/UserContext";
import Link from "next/link";
import { useModal } from "@/context/ModalContext";
import { BiLogOut } from "react-icons/bi";
import LoadingWheel from "@/components/UI/LoadingWheel";
import { useWeaveDB } from "@/context/WeaveDBContext";
import { useLit } from "@/context/LitContext";

const defaultSidebarItems: { text: string; icon: string; href: string }[] = [
  { text: "Home", icon: "/page-icons/home-icon.svg", href: "/app" },
  // { text: "Explore", icon: "/page-icons/glass-icon.svg", href: "/app" },
];

const Sidebar = () => {
  const { user, disconnectUser } = useUser();
  const { handleOpenConnectModal } = useModal();

  const displayedCommunities = Array.from(
    new Set([...user.communityOwnerships, ...user.communityMemberships]),
  );

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
          <ul className="mb-8 max-h-[calc(100vh-310px)]  space-y-5 overflow-y-auto scrollbar-none">
            {displayedCommunities.map((communityId) => (
              <CommunityListItem key={communityId} communityId={communityId} />
            ))}
          </ul>
        </div>
      )}

      {user?.loading && (
        <div className="flex flex-col px-1">
          <ul className="mb-8 max-h-[calc(100vh-310px)]  space-y-5 overflow-y-auto scrollbar-none">
            <LoadingWheel />
          </ul>
        </div>
      )}

      {user?.isLoggedIn && (
        <div className="fixed bottom-8 flex items-center justify-center gap-3">
          <div className={`rounded-full border-[1px] bg-gray-strong `}>
            <Image
              /** 
               @DEV remove opacity-0 to display image
               **/
              className={`h-12 w-12 rounded-full opacity-0 `}
              src={"isologo.svg"}
              width={50}
              height={50}
              alt="Collectible Logo"
            />
          </div>
          <Link
            className="mr-6 flex flex-col"
            href={`/app/profile/${user?.address}`}
          >
            <p className="text-gray-strong opacity-50">{user?.name}</p>
            <p className="text-sm text-gray-strong opacity-50">
              {user?.shortAddress}
            </p>
          </Link>
          {!user?.loading && user?.isLoggedIn && (
            <button
              className="text-2xl text-gray-medium "
              onClick={disconnectUser}
            >
              <BiLogOut />
            </button>
          )}
        </div>
      )}

      <div className="fixed bottom-8 ml-2 flex items-center justify-center">
        {!user?.loading && !user?.isLoggedIn && (
          <Button isLarge className="w-[200px]" action={handleOpenConnectModal}>
            Connect Account
          </Button>
        )}
        {user?.loading && (
          <Button isLarge className="w-[200px]" action={() => {}}>
            Loading account..
          </Button>
        )}
      </div>
    </>
  );
};

export default Sidebar;
