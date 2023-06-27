import Image from "next/image";

type CollectionOverviewInfo = {
  description: string;
  communityName: string;
  communityPicture: string;
};

const CommunityOverviewCard = ({
  description,
  communityName,
  communityPicture,
}: CollectionOverviewInfo) => {
  const gradientColor = "from-indigo-500"; // TODO make medium color of comunity picture

  return (
    <article
      className={`h-auto w-full rounded-lg bg-gradient-to-b ${gradientColor} to-collectible-dark-purple px-7 pt-20 pb-7`}
    >
      <div className="mb-5 flex items-center">
        <Image
          className="w-16 h-16 rounded-full object-cover bg-gray-strong"
          src={communityPicture}
          width={65}
          height={65}
          alt=""
        />
        <h2 className="ml-5 text-2xl font-bold text-gray-strong">
          {communityName}
        </h2>
      </div>

      <p className="text-sm font-normal leading-6 text-gray-strong">
        {description}
      </p>
    </article>
  );
};

export default CommunityOverviewCard;
