import React, { useState } from "react";
import Image from "next/image";
import { useUser } from "@/context/UserContext";
import SearchBar from "./SearchBar";
import Link from "next/link";

const Header = () => {
  const { user } = useUser();
  const [searchbarQuery, setSearchbarQuery] = useState("");

  return (
    <header className="mt-6 mb-4 flex w-full px-6">
      <Link className="mr-3 w-64" href="/">
        <Image
          src={"/collectible-logo.svg"}
          width={82}
          height={50}
          alt="Collectible Logo"
        />
      </Link>
      <SearchBar
        query={searchbarQuery}
        handleQuery={setSearchbarQuery}
        placeholderText="Search Collectibles..."
      />
      {user?.isLoggedIn && (
        <Link
          className="ml-auto flex items-center gap-4"
          href={`/profile/${user?.address}`}
        >
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
        </Link>
      )}
    </header>
  );
};

export default Header;
