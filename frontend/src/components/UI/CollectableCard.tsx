import React from "react";
import Image from "next/image";

export const CollectableCard = ({
  pictureUrl,
  name,
  description,
}: {
  pictureUrl: string;
  name: string;
  description: string;
}) => {
  return (
    <div className="h-72 w-52 bg-collectible-medium-purple p-4">
      <div className="absolute mb-4">
        <Image
          src={pictureUrl}
          fill={true}
          alt=""
          className="rounded-full bg-gray-medium"
        />
      </div>
      <h3 className="truncate text-base font-bold text-gray-strong">{name}</h3>
      <p className="truncate text-sm font-semibold text-gray-weak">
        {description}
      </p>
    </div>
  );
};

export default CollectableCard;
