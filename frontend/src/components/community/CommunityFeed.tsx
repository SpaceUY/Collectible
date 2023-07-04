import { useState } from "react";
import { COMMUNITY_POSTS } from "../../../mock/community-post";
import CommunityPost from "../UI/CommunityPost";

const CommunityFeed = ({ communityId }: { communityId: string }) => {
  const [isLoading, setIsLoading] = useState(false);

  // TODO fetch by id
  const communityPostsById = COMMUNITY_POSTS.filter(
    (post) => post.communityId === communityId,
  );

  return !isLoading ? (
    <>
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
    </>
  ) : (
    <> TODO LOADING wheel or skeleton? </>
  );
};

export default CommunityFeed;
