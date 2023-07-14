import { useState } from "react";
import { COMMUNITY_POSTS } from "../../../mock/community-post";
import CommunityPost from "../UI/CommunityPost";
import AddPost from "../UI/AddPost";
import { useCollectible } from "../../context/CollectibleContext";
import { Community } from "../../common/types/Community.type";
import { CommunityPost as CommunityPostType } from "../../common/types/CommunityPost.type";

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

  // TODO fetch by id

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
    <> TODO LOADING wheel or skeleton? </>
  );
};

export default CommunityFeed;
