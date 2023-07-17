import Layout from "@/components/Layout";
import CommunityPost from "../components/UI/CommunityPost";
import Head from "next/head";
import CollectiblesReel from "../components/UI/CollectiblesReel";
import { useWeaveDB } from "@/context/WeaveDBContext";
import LoadingWheel from "@/components/UI/LoadingWheel";
import { useEffect, useState } from "react";

interface FeedContent {
  date: string;
  element: JSX.Element;
}

export default function CollectiblesPage() {
  const { allCommunities, loadingDB } = useWeaveDB();

  const [feedContent, setFeedContent] = useState<FeedContent[]>([]);

  useEffect(() => {
    if (!loadingDB) {
      const allPostsWithCommunities = allCommunities
        .map((community) => {
          return community.posts.map((post) => ({
            ...post,
            community: community, // Needed in CommunityPost component, can be improved.
          }));
        })
        .flat();
      console.log("All posts", allPostsWithCommunities);

      const allPublicPostsWithCommunities = allPostsWithCommunities.filter(
        (post) => post.isPublic,
      );
      console.log("All public posts", allPublicPostsWithCommunities);

      const allCollections = allCommunities
        .map((community) => {
          return community.collections.map((collection) => collection);
        })
        .flat();
      console.log("All collections", allCollections);

      const feed = [];
      allPublicPostsWithCommunities.forEach((post, idx) => {
        feed.push({
          date: post.creationDate,
          element: (
            <CommunityPost
              post={post}
              key={post.postId}
              community={post.community}
            />
          ),
        });
      });
      // allCollections.forEach((collection, idx) => {
      //   feedContent.push({
      //     date: collection.creationDate,
      //     element: (
      //       <CollectiblesReel
      //         key={collection.address}
      //         collectionWithNfts={collection}
      //       />
      //     ),
      //   });
      // });

      setFeedContent(feed);
    }
  }, [loadingDB, allCommunities]);

  return (
    <Layout title="Home" className="">
      <Head>
        <title>Collectible - Home</title>
      </Head>
      {loadingDB && (
        <div className="flex h-[calc(100vh-200px)] items-center justify-center">
          <LoadingWheel />
        </div>
      )}

      {/** @DEV Home Feed */}
      {!loadingDB && (
        <div className="flex flex-col gap-8">
          {feedContent
            .sort((a, b) => {
              return new Date(b.date).getTime() - new Date(a.date).getTime();
            })
            .map((content) => content.element)}
        </div>
      )}
    </Layout>
  );
}
