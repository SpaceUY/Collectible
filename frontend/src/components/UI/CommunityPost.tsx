import Image from "next/image";

type CommunityPostProps = {
  postText: string;
  title: string;
  authorPicture: string;
};

const postIconOptions: { altDescription: string; icon: string }[] = [
  { altDescription: "Like", icon: "/page-icons/heart-icon.svg" },
  { altDescription: "Comments", icon: "/page-icons/chat-icon.svg" },
  { altDescription: "Share", icon: "/page-icons/share-icon.svg" },
];

const CommunityPost = ({
  postText,
  title,
  authorPicture,
}: CommunityPostProps) => {
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
        <h3 className="ml-5 text-2xl font-bold text-gray-strong">{title}</h3>
      </div>

      <p className="text-sm font-normal leading-6 text-gray-strong">
        {postText}
      </p>

      <div className="mt-5 flex items-start gap-x-3">
        {postIconOptions.map((option) => (
          <Image
            key={option.altDescription}
            src={option.icon}
            width={15}
            height={15}
            alt={option.altDescription}
            className="cursor-pointer"
          />
        ))}
      </div>
    </article>
  );
};

export default CommunityPost;
