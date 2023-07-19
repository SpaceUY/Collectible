import Image from "next/image";
import { POST_ICON_OPTIONS } from "../../common/constants/post-icon-options";
import Link from "next/link";
import { Post, Community } from "../../../../types";
import { formatTime } from "utils/functions";

interface CommunityPostProps {
  community: Community;
  post: Post;
  disableCommunityLink?: boolean;
}

const CommunityPost = ({
  community,
  post,
  disableCommunityLink,
}: CommunityPostProps) => {
  const { communityId, isPublic, creationDate, content } = post;

  return (
    <article className="h-auto w-full rounded-lg bg-collectible-medium-purple px-5 py-6 ">
      {community && (
        <div className="mb-3 flex items-center justify-between">
          <div className="flex cursor-default items-center gap-4">
            <Link
              href={!disableCommunityLink ? `/community/${communityId}` : ""}
              className={`flex items-center`}
            >
              <Image
                className="h-10 w-10 rounded-full bg-white/10 object-contain"
                src={community.picture}
                width={100}
                height={100}
                quality={100}
                alt=""
              />
              <h3 className="ml-2.5 font-medium text-gray-medium">
                {community.name}
              </h3>
            </Link>

            <p className="text-sm text-gray-medium">
              {formatTime(creationDate)}
            </p>
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
