import { useState } from "react";
import { COLLECTIBLE_CARDS } from "../../../mock/collectible-cards";
import { COMMUNITY_POSTS } from "../../../mock/community-post";
import CollectablesReel from "../UI/CollectiblesReel";
import CommunityPost from "../UI/CommunityPost";

const Feed = ({ communityId }: { communityId: string }) => {
  const [isLoading, setIsLoading] = useState(false);

  // TODO fetch by id
  const communityPostsById = COMMUNITY_POSTS.filter(
    (post) => post.id === communityId,
  );

  return !isLoading ? (
    <>
      {/* <CollectablesReel collectibleCards={COLLECTIVE_CARDS} /> */}
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
            key={post.id}
            id={post.id}
            createdAt={post.createdAt}
          />
        ))}
    </>
  ) : (
    <> TODO LOADING wheel or skeleton? </>
  );
};

export default Feed;
