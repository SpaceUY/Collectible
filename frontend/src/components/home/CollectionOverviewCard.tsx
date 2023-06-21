import Image from "next/image";

type CollectionOverviewInfo = {
  postText: string;
  title: string;
  authorPicture: string;
};

const CollectionOverviewCard = ({
  postText,
  title,
  authorPicture,
}: CollectionOverviewInfo) => {
  return (
    <article className="h-auto w-full rounded-lg bg-collectible-medium-purple p-7">
      <div className="mb-5 flex items-center">
        <Image
          src={authorPicture}
          width={65}
          height={65}
          alt=""
          className="rounded-full bg-gray-medium"
        />
        <h2 className="ml-5 text-2xl font-bold text-gray-strong">{title}</h2>
      </div>

      <p className="text-sm font-normal leading-6 text-gray-strong">
        {postText}
      </p>
    </article>
  );
};

export default CollectionOverviewCard;
