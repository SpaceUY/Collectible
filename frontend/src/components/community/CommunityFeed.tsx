import { useState } from "react";
import { COMMUNITY_POSTS } from "../../../mock/community-post";
import CommunityPost from "../UI/CommunityPost";
import AddPost from "../UI/AddPost";

interface CommunityFeedProps {
  communityId: string;
  communityPicture: string;
  communityName: string;
  isOwner: boolean;
  isMember: boolean;
}

const CommunityFeed = ({
  communityId,
  communityPicture,
  communityName,
  isOwner,
  isMember,
}: CommunityFeedProps) => {
  const [isLoading, setIsLoading] = useState(false);

  // TODO fetch by id
  const communityPostsById = COMMUNITY_POSTS.filter(
    (post) => post.communityId === communityId,
  );

  return !isLoading ? (
    <div className="mb-40 flex flex-col gap-4">
      {/* {isOwner && (
        <AddPost userPicture={communityPicture} userName={communityName} />
      )} */}
      {communityPostsById
        .sort((a, b) => {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        })
        .map((post) => (
          <CommunityPost
            authorPicture={post.authorPicture}
            postText={post.postText}
            title={post.title}
            key={post.postId}
            postId={post.postId}
            authorName={post.authorName}
            communityId={post.communityId}
            createdAt={post.createdAt}
          />
        ))}
    </div>
  ) : (
    <> TODO LOADING wheel or skeleton? </>
  );
};

export default CommunityFeed;
