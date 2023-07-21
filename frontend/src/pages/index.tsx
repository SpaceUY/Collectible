import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import { COMMUNITY_POSTS } from "../../mock/community-post";
import CommunityPost from "../components/UI/CommunityPost";
import Head from "next/head";
import { COLLECTIONS } from "../../mock/collections";
import CollectiblesReel from "../components/UI/CollectiblesReel";

export default function CollectiblesPage() {
  const { user } = useUser();

  // initialize the state used to track the current page's data
  const [loading, setLoading] = useState(user?.refreshCollectibles);

  useEffect(() => {
    // do nothing if the user is not logged in
    if (!user?.address) {
      setLoading(true);
      return;
    }

    // disable the loading after collectibles have already been loaded
    if (user?.address && !user?.refreshCollectibles && user?.collectibles) {
      setLoading(false);
      return;
    }
  }, [user?.address, user?.refreshCollectibles, user?.collectibles]);

  const feedContent: { date: string; element: JSX.Element }[] = [];

  COMMUNITY_POSTS.forEach((post) => {
    feedContent.push({
      date: post.createdAt,
      element: (
        <CommunityPost
          title={post.title}
          postText={post.postText}
          postId={post.postId}
          communityId={post.communityId}
          authorName={post.authorName}
          authorPicture={post.authorPicture}
          key={post.postId}
          createdAt={post.createdAt}
        />
      ),
    });
  });

  COLLECTIONS.forEach((collection) => {
    feedContent.push({
      date: collection.createdAt,
      element: (
        <CollectiblesReel
          key={collection.id}
          collectibleCards={collection.collectibles}
          headerText={
            "New " + collection.communityId + " collection: " + collection.name
          }
        />
      ),
    });
  });

  return (
    <Layout title="Home" className="">
      <Head>
        <title>Collectible - Home</title>
      </Head>

      {/** @DEV Home Feed */}
      <div className="flex flex-col gap-8">
        {feedContent
          .sort((a, b) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
          })
          .map((content) => content.element)}
      </div>
    </Layout>
  );
}
