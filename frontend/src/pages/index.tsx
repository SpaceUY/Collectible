import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import AddPost from "../components/UI/AddPost";
import { COMMUNITY_POSTS } from "../../mock/community-post";
import CommunityPost from "../components/UI/CommunityPost";
import CalendarSelector from "../components/brand/CalendarSelector";
import Head from "next/head";
import { COLLECTIONS } from "../../mock/collections";
import CollectiblesReel from "../components/UI/CollectiblesReel";

const tokens = [
  { id: 0, image: "/img/Ace Hiro.png" },
  { id: 3, image: "/img/Jack Hiro.png" },
  { id: 9, image: "/img/Queen Hiro.png" },
  { id: 4, image: "/img/King Hiro.png" },
];

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
          authorPicture={post.authorPicture}
          postText={post.postText}
          title={post.title}
          id={post.id}
          key={post.id}
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
          collectibleCards={collection.collectables}
        />
      ),
    });
  });

  return (
    <Layout title="Home" className="">
      <Head>
        <title>Collectible - Home</title>
      </Head>

      <div className="flex flex-col gap-4">
        {feedContent
          .sort((a, b) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
          })
          .map((content) => content.element)}
      </div>
    </Layout>
  );
}
