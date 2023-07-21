import Image from "next/image";
import { CommunityPostProps } from "../../common/interfaces/community-post-props.interface";
import { POST_ICON_OPTIONS } from "../../common/constants/post-icon-options";
import Link from "next/link";

const CommunityPost = ({
  postText,
  title,
  authorPicture,
  postId,
  communityId,
  authorName,
}: CommunityPostProps) => {
  return (
    <article className="h-auto w-full rounded-lg bg-collectible-medium-purple px-5 py-6 ">
      <div className="mb-3.5">
        <Link href={`/community/${communityId}`} className="flex items-center">
          <Image
            className="h-10 w-10 rounded-full bg-gray-medium bg-gray-strong object-cover"
            src={authorPicture}
            width={65}
            height={65}
            alt=""
          />
          <h3 className="ml-3.5 text-xl font-semibold text-gray-strong">
            {authorName}
          </h3>
        </Link>
      </div>

      <p className="text-sm font-normal leading-6 text-gray-strong">
        {postText}
      </p>

      <div className="mt-[1.125rem] flex items-start gap-x-3">
        {POST_ICON_OPTIONS.map((option) => (
          <Image
            key={option.altDescription}
            src={option.icon}
            width={15}
            height={15}
            alt={option.altDescription}
            className="h-4 w-4 cursor-pointer"
          />
        ))}
      </div>
    </article>
  );
};

export default CommunityPost;
