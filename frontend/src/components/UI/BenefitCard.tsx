import Image from "next/image";
import React from "react";
import {
  BenefitType,
  Benefit,
} from "../../common/interfaces/community-benefit.interface";
import Button from "./Button";

interface BenefitCardProps extends Benefit {
  isMember: boolean;
}

const BenefitCard = ({
  name,
  description,
  image,
  type,
  id,
  isMember,
}: BenefitCardProps) => {
  return (
    <div
      className="w-[220px] cursor-pointer rounded-lg bg-collectible-medium-purple p-4"
    >
      <div className="relative w-full rounded-lg bg-gray-medium">
        <Image
          className="w-full rounded-lg object-cover"
          src={image}
          width={200}
          height={200}
          alt=""
          quality={100}
        />
      </div>

      <h3 className="mt-3 truncate text-base font-bold text-gray-strong">
        {name}
      </h3>
      <p className="truncate text-sm font-semibold text-gray-weak">
        {description}
      </p>
      {isMember && (
        <Button
          className="mt-4"
          action={() => {
            alert("clicked claim");

            // TODO claim benefit
          }}
        >
          Access
        </Button>
      )}
    </div>
  );
};

export default BenefitCard;
