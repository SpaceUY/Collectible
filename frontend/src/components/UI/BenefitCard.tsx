import Image from "next/image";
import React from "react";
import Button from "./Button";
import { Benefit } from "../../../types";

interface BenefitCardProps {
  benefit: Benefit;
  isMember: boolean;
  isOwner: boolean;
}

const BenefitCard = ({ benefit, isMember, isOwner }: BenefitCardProps) => {

  let imagePath = "";
  switch (benefit.type) {
    case "discord-access":
      imagePath = "/img/benefit-discord.png";
      break;
    case "zoom-call-access":
      imagePath = "/img/benefit-zoom.png";
      break;
    case "merch":
      imagePath = "/img/benefit-merch.png";
      break;
    case "content":
      imagePath = "/img/benefit-content.png";
      break;
    default:
      break;
  }
  return (
    <div className="w-[220px] cursor-pointer rounded-lg bg-collectible-medium-purple p-4">
      <div className="relative w-full rounded-lg bg-gray-medium">
        <Image
          className="w-full rounded-lg object-cover"
          src={imagePath}
          width={200}
          height={200}
          alt=""
          quality={100}
        />
      </div>

      <h3 className="mt-3 truncate text-base font-bold text-gray-strong">
        {benefit.name}
      </h3>
      <p className="truncate text-xs font-semibold text-gray-weak">
        Available from {benefit.startDate} to {benefit.finishDate}
      </p>
      {(isMember || isOwner) && (
        <Button
          className="mt-4"
          action={() => {
            // TODO claim benefit
            alert("clicked claim");
          }}
        >
          Access
        </Button>
      )}
    </div>
  );
};

export default BenefitCard;
