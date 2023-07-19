import Layout from "@/components/Layout";
import CommunityPost from "../components/UI/CommunityPost";
import Head from "next/head";
import CollectiblesReel from "../components/UI/CollectiblesReel";
import { useWeaveDB } from "@/context/WeaveDBContext";
import LoadingWheel from "@/components/UI/LoadingWheel";
import { useEffect, useState } from "react";
import { PostWithCommunity, Post } from "../../../types";
import { DISPLAY_NEW_COLLECTIONS_ON_FEED } from "../../constants";

interface FeedContent {
  date: string;
  element: JSX.Element;
}

const collectiblePost: Post = {
  communityId: "collectible",
  content:
    "Welcome to Collectible!. The platform is still under development, so handle us with care. LFG #WeaveDBFellowship",
  creationDate: "2023-07-19T00:00:00.000Z",
  isPublic: true,
  postId: "collectible-post-01",
};
const collectiblePostWithCommunity: PostWithCommunity = {
  ...collectiblePost,
  community: {
    name: "Collectible",
    communityId: "collectible",
    coverColor: "purple",
    creationDate: "2023-07-19T00:00:00.000Z",
    description: "Welcome to the Collectible community!",
    picture: "/logo.svg",
    benefits: [],
    collections: [],
    posts: [collectiblePost],
    owners: ["0xc0f2B485cFe95B3A1df92dA2966EeB46857fe2a6"],
  },
};

export default function CollectiblesPage() {
  const { allCommunities, loadingDB, newCollections } = useWeaveDB();

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

      const allPublicPostsWithCommunities = allPostsWithCommunities.filter(
        (post) => post.isPublic,
      );

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

      if (DISPLAY_NEW_COLLECTIONS_ON_FEED) {
        newCollections.forEach((collection) => {
          if (collection.nfts.length > 0) {
            feed.push({
              date: collection.creationDate,
              element: (
                <CollectiblesReel
                  key={collection.address}
                  nfts={collection.nfts}
                  headerText={`New collection: ${collection.name}`}
                  creationDate={collection.creationDate}
                />
              ),
            });
          }
        });
      }

      setFeedContent(feed);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingDB, allCommunities, newCollections]);

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
          {
            <CommunityPost
              post={collectiblePost}
              key={collectiblePostWithCommunity.postId}
              community={collectiblePostWithCommunity.community}
              disableCommunityLink
            />
          }
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
