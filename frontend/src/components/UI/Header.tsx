import React, { useState } from "react";
import Image from "next/image";
import { useUser } from "@/context/UserContext";
import SearchBar from "./SearchBar";
import Link from "next/link";
import { useWeaveDB } from "@/context/WeaveDBContext";
import { useLit } from "@/context/LitContext";

const Header = () => {
  const { user } = useUser();
  const [searchbarQuery, setSearchbarQuery] = useState("");
  const { authSig, handleSignAuthSig } = useLit();
  const { identity, checkOrSignIdentity } = useWeaveDB();

  const handleCheckOrSignIdentity = async () => {
    await checkOrSignIdentity();
  };

  return (
    <>
      <div className="relative mr-[14px] w-[250px] shrink-0  px-4">
        <Link href="/">
          <Image
            src={"/isologo.svg"}
            width={145.54}
            height={47.05}
            alt="Collectible Logo"
          />
        </Link>

        <div className="absolute right-1 top-[55%] flex translate-y-[-50%] items-center gap-1">
          <Image
            className={`h-6 w-6 ${
              identity ? "opacity-1" : "opacity-20"
            } cursor-pointer`}
            onClick={handleCheckOrSignIdentity}
            width={50}
            height={50}
            src="/weavedb.svg"
            alt="WeaveDB logo"
          />
          <Image
            className={`h-7 w-7 ${
              authSig ? "opacity-1" : "opacity-20"
            } cursor-pointer`}
            onClick={handleSignAuthSig}
            width={50}
            height={50}
            src="/lit.svg"
            alt="Lit logo"
          />
        </div>
      </div>

      <SearchBar
        query={searchbarQuery}
        handleQuery={setSearchbarQuery}
        placeholderText="Search Collectibles..."
      />
    </>
  );
};

export default Header;
