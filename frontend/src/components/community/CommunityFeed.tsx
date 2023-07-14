import { useState } from "react";
import CommunityPost from "../UI/CommunityPost";
import AddPost from "../UI/AddPost";
import { Community } from "../../common/types/Community.type";
import { CommunityPost as CommunityPostType } from "../../common/types/CommunityPost.type";
import LoadingWheel from "../UI/LoadingWheel";

interface CommunityFeedProps {
  community: Community;
  posts: CommunityPostType[];
  isOwner: boolean;
  isMember: boolean;
}

const CommunityFeed = ({
  community,
  posts,
  isOwner,
  isMember,
}: CommunityFeedProps) => {
  const [isLoading, setIsLoading] = useState(false);

  return !isLoading ? (
    <div className="mb-40 flex flex-col gap-4">
      {isOwner && <AddPost communityId={community.id} />}
      {posts.map((post) => (
        <CommunityPost
          postText={post.data.text}
          title={post.data.title}
          key={post.id}
          postId={post.id}
          communityId={community.id}
          createdAt={post.data.date}
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
