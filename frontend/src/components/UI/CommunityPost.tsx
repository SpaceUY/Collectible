import Image from "next/image";
import { CommunityPostProps } from "../../common/interfaces/community-post-props.interface";
import { POST_ICON_OPTIONS } from "../../common/constants/post-icon-options";

const CommunityPost = ({
  postText,
  title,
  authorPicture,
}: CommunityPostProps) => {
  return (
    <article className="h-auto w-full rounded-lg bg-collectible-medium-purple p-7">
      <div className="mb-5 flex items-center">
        <Image
          className="rounded-full bg-gray-medium w-12 h-12"
          src={authorPicture}
          width={65}
          height={65}
          alt=""
        />
        <h3 className="ml-3 text-2xl font-bold text-gray-strong">{title}</h3>
      </div>

      <p className="text-sm font-normal leading-6 text-gray-strong">
        {postText}
      </p>

      <div className="mt-5 flex items-start gap-x-3">
        {POST_ICON_OPTIONS.map((option) => (
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
