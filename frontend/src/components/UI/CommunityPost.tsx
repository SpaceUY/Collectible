import Image from "next/image";
import { CommunityPostProps } from "../../common/interfaces/community-post-props.interface";
import { POST_ICON_OPTIONS } from "../../common/constants/post-icon-options";
import Link from "next/link";
import { useCollectible } from "../../context/CollectibleContext";

const CommunityPost = ({
  postText,
  title,
  postId,
  communityId,
}: CommunityPostProps) => {
  const { communities } = useCollectible();

  const community = communities.find(
    (community) => community.id === communityId,
  );

  return (
    <article className="h-auto w-full rounded-lg bg-collectible-medium-purple px-5 py-6 ">
      <h1 className="mb-3 text-xl font-bold text-gray-strong">{title}</h1>

      {community && (
        <div className="mb-3">
          <Link
            href={`/community/${communityId}`}
            className="flex items-center"
          >
            <Image
              className="h-6 w-6 rounded-full bg-gray-medium bg-gray-strong object-cover"
              src={community.data.logo}
              width={10}
              height={10}
              alt=""
            />
            <h3 className="ml-2 text-sm font-medium text-gray-medium">
              {community.data.name}
            </h3>
          </Link>
        </div>
      )}

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
