import Image from "next/image";
import { SetStateAction } from "react";

const SearchBar = ({
  query = "",
  handleQuery,
  variant = "dark-purple",
  placeholderText = "Search",
}: {
  query: string;
  handleQuery: (value: SetStateAction<string>) => void;
  variant?: "dark-purple" | "medium-purple";
  placeholderText?: string;
}) => {
  let searchbarVariantColor = "";
  switch (variant) {
    case "dark-purple":
      searchbarVariantColor = "bg-collectible-dark-purple";
      break;
    case "medium-purple":
      searchbarVariantColor = "bg-collectible-medium-purple";
      break;
    default:
      break;
  }

  return (
    <div className="relative w-full">
      {!query.length && (
        <Image
          src={"/page-icons/glass-icon.svg"}
          width={20}
          height={20}
          alt=""
          className="x-10 absolute left-4 top-4"
        />
      )}
      <input
        name="search"
        type="text"
        placeholder={placeholderText}
        className={`h-14 w-full rounded-lg p-4 text-gray-weak placeholder-gray-weak ${
          !query.length && "pl-12"
        } ${searchbarVariantColor}`}
        onChange={(e) => handleQuery(e.target.value)}
        value={query}
      />
    </div>
  );
};

export default SearchBar;
