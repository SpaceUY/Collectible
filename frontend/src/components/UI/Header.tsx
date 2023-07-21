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
      <Link className="mr-[14px] w-[250px] shrink-0 px-4" href="/">
        <Image
          src={"/collectible-logo.svg"}
          width={145.54}
          height={47.05}
          alt="Collectible Logo"
        />
      </Link>

      <SearchBar
        query={searchbarQuery}
        handleQuery={setSearchbarQuery}
        placeholderText="Search Collectibles..."
      />
    </>
  );
};

export default Header;
