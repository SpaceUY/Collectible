import React, { useState } from "react";
import Image from "next/image";
import { useUser } from "@/context/UserContext";
import SearchBar from "./SearchBar";
import Link from "next/link";

const Header = () => {
  const { user } = useUser();
  const [searchbarQuery, setSearchbarQuery] = useState("");

  return (
    <>
      <Link className="w-64 shrink-0 " href="/">
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

      {user?.isLoggedIn ? (
        <Link
          className="flex w-64 shrink-0 items-center justify-end gap-4 pr-2"
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
      ) : (
        <></>
      )}
    </>
  );
};

export default Header;
