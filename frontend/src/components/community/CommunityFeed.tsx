import { useState } from "react";
import CommunityPost from "../UI/CommunityPost";
import AddPost from "../UI/AddPost";
import { CommunityPost as CommunityPostType } from "../../common/types/CommunityPost.type";
import LoadingWheel from "../UI/LoadingWheel";
import { Community, Post } from "../../../types";

interface CommunityFeedProps {
  community: Community;
  isOwner: boolean;
  isMember: boolean;
}

const CommunityFeed = ({
  community,
  isOwner,
  isMember,
}: CommunityFeedProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const posts: Post[] = community.posts;

  const isMemberOrOwner = isMember || isOwner;
  return !isLoading ? (
    <div className="mb-40 flex flex-col gap-4">
      {isOwner && <AddPost community={community} />}
      {posts
        .sort(
          (a, b) =>
            new Date(b.creationDate).getTime() -
            new Date(a.creationDate).getTime(),
        )
        .map((post, idx) => (
          <CommunityPost
            community={community}
            post={post}
            key={idx}
            isMemberOrOwner={isMemberOrOwner}
          />
        ))}
    </div>
  ) : (
    <div className="h-56">
      <LoadingWheel />
    </div>
  );
};

export default CommunityFeed;
