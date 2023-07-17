import Image from "next/image";
import { POST_ICON_OPTIONS } from "../../common/constants/post-icon-options";
import Link from "next/link";
import { Post, Community } from "../../../../types";
import { formatTime } from "utils/functions";

interface CommunityPostProps {
  community: Community;
  post: Post;
}

const CommunityPost = ({ community, post }: CommunityPostProps) => {
  const { communityId, isPublic, creationDate, content } = post;
  console.log("post", post);

  return (
    <article className="h-auto w-full rounded-lg bg-collectible-medium-purple px-5 py-6 ">
      {community && (
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href={`/community/${communityId}`}
              className="flex items-center"
            >
              <Image
                className="h-8 w-8 rounded-full bg-gray-medium bg-gray-strong object-cover"
                src={community.picture}
                width={10}
                height={10}
                alt=""
              />
              <h3 className="ml-2.5 font-medium text-gray-medium">
                {community.name}
              </h3>
            </Link>

            <p className="text-gray-medium text-sm">{formatTime(creationDate)}</p>
          </div>

          {!isPublic && (
            <span className="rounded-full bg-gray-strong px-3 py-1">
              <p className="text-gray-soft text-sm font-semibold leading-5">
                member-only
              </p>
            </span>
          )}
        </div>
      )}

      <p className="text-sm font-normal leading-6 text-gray-strong">
        {content}
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
