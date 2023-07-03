import { useState } from "react";
import { COLLECTIVE_CARDS } from "../../../mock/collective-cards";
import { COMMUNITY_POSTS } from "../../../mock/community-post";
import CollectablesReel from "../UI/CollectablesReel";
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
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        })
        .map((post) => (
          <CommunityPost
            authorPicture={post.authorPicture}
            postText={post.postText}
            title={post.title}
            key={post.id}
            id={post.id}
            date={post.date}
          />
        ))}
    </>
  ) : (
    <> TODO LOADING wheel or skeleton? </>
  );
};

export default Feed;
