import { useState } from "react";
import { COLLECTIVE_CARDS } from "../../../mock/collective-cards";
import { COMMUNITY_POSTS } from "../../../mock/community-post";
import CollectablesReel from "../UI/CollectiblesReel";
import CommunityPost from "../UI/CommunityPost";

const Feed = () => {
  const [isLoading, setIsLoading] = useState(false);

  return !isLoading ? (
    <>
      <CollectablesReel collectibleCards={COLLECTIVE_CARDS} />
      {COMMUNITY_POSTS.map((post) => (
        <CommunityPost
          authorPicture={post.authorPicture}
          postText={post.postText}
          title={post.title}
          key={post.id}
          id={post.id}
        />
      ))}
    </>
  ) : (
    <> TODO LOADING wheel or skeleton? </>
  );
};

export default Feed;
