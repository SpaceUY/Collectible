import Image from "next/image";
import { CoverColor } from '../../../types';


type CollectionOverviewInfo = {
  description: string;
  communityName: string;
  communityPicture: string;
  isOwner: boolean;
  isMember: boolean;
  coverColor: CoverColor;
};

const colorToClass = (coverColor: CoverColor) => {
  switch (coverColor) {
    case "purple":
      return "from-purple-500";
    case "yellow":
      return "from-yellow-500";
    case "red":
      return "from-red-500";
    case "white":
      return "from-gray-strong";
    case "black":
      return "from-black";
    default:
      return "from-purple-500";
  }
};

const CommunityOverviewCard = ({
  description,
  communityName,
  communityPicture,
  isOwner,
  isMember,
  coverColor,
}: CollectionOverviewInfo) => {
  const colorClass = colorToClass(coverColor);
  return (
    <article
      className={`relative h-auto w-full rounded-lg bg-gradient-to-b ${colorClass} to-collectible-dark-purple px-7 pt-20 pb-16`}
    >
      <div className="mb-5 flex items-center ">
        <Image
          className="h-16 w-16 rounded-full bg-gray-strong object-cover"
          src={communityPicture}
          width={65}
          height={65}
          alt=""
        />
        <h2 className="ml-5 text-2xl font-bold text-gray-strong">
          {communityName}
        </h2>
        {isOwner && (
          <>
            <span className="ml-5 rounded-full bg-gray-strong px-3 py-1">
              <p className="text-gray-soft text-sm font-semibold leading-5">
                Owner
              </p>
            </span>
            <button
              onClick={() => {
                alert("Edit Community");
              }}
            >
              <Image
                className="absolute top-6 right-6 h-5 w-5"
                alt="edit community icon"
                src={"/page-icons/edit-icon.svg"}
                width={20}
                height={20}
              />
            </button>
          </>
        )}
        {!isOwner && isMember && (
          <span className="ml-5 rounded-full bg-gray-strong px-3 py-1">
            <p className="text-gray-soft text-sm font-semibold leading-5">
              Member
            </p>
          </span>
        )}
      </div>

      <p className="text-sm font-normal leading-6 text-gray-strong h-14">
        {description}
      </p>
    </article>
  );
};

export default CommunityOverviewCard;
