import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import CommunityOverviewCard from "../components/home/CommunityOverviewCard";
import AddPost from "../components/UI/AddPost";
import CollectablesReel from "../components/UI/CollectablesReel";
import { COMMUNITY_POSTS } from "../../mock/community-post";
import { COLLECTIVE_CARDS } from "../../mock/collective-cards";
import CommunityPost from "../components/UI/CommunityPost";
import CalendarSelector from "../components/brand/CalendarSelector";

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

  return (
    <Layout title="Home" className="">
      <div className="flex flex-col gap-5">
        <CalendarSelector />
        <AddPost
          userName={"adas"}
          userPicture={COMMUNITY_POSTS[0].authorPicture}
        />
        {COMMUNITY_POSTS.sort((a, b) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        }).map((post) => (
          <CommunityPost
            authorPicture={post.authorPicture}
            postText={post.postText}
            title={post.title}
            key={post.id}
            id={post.id}
            date={post.date}
          />
        ))}
      </div>
    </Layout>
  );
}
