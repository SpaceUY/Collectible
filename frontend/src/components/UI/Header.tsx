import React from "react";
import Image from "next/image";
import { useUser } from "@/context/UserContext";

const Header = () => {
  const { user } = useUser();

  return (
    <header className="border-1 ml-5 mt-6 flex items-center justify-between">
      <Image
        src={"/collectible-logo.svg"}
        width={82}
        height={50}
        alt="Collectible Logo"
      />
      {user?.isLoggedIn && (
        <div className="mr-8 flex items-center gap-4">
          <span className="flex flex-col items-end">
            <p className="text-gray-strong opacity-50">userName</p>
            <p className="text-sm text-gray-strong opacity-50">
              {user?.shortAddress}
            </p>
          </span>
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
        </div>
      )}
    </header>
  );
};

export default Header;
