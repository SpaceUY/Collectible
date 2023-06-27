import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import CommunityOverviewCard from "../components/home/CommunityOverviewCard";
import AddPost from "../components/UI/AddPost";
import CollectablesReel from "../components/UI/CollectablesReel";

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
      <div className="mx-72 w-full rounded-lg bg-collectible-dark-purple px-5 py-7 md:w-auto">
        <CommunityOverviewCard
          communityPicture=""
          communityName="Asldas jasd"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis sem
        vitae ipsum tristique consequat. Nunc viverra fringilla arcu, at aliquet
        nulla efficitur non. Aliquam tristique nunc non purus ultricies, in
        consectetur nisl scelerisque. In sollicitudin pharetra dui, in
        condimentum ligula rhoncus at. Integer congue leo vel justo blandit, eu
        convallis metus convallis. Morbi ut felis id lectus tincidunt convallis."
        />

        <AddPost userName="das" userPicture="" />

        <CollectablesReel />
      </div>

      {/* <section className="hero">
        <h1>Home</h1>
        <p>
          Here you can explore new publications, collections and etc without
          being logged.
        </p>
        <br />
        <br />
        <h2 className="">New Collection from the Magic Team</h2>
        <div className="flex justify-center">
          <section className="inline-grid place-items-center gap-8 md:grid-cols-3 lg:grid-cols-4">
            {tokens.slice(0, 4).map((item, id) => (
              <CollectibleCard key={id} item={item} />
            ))}
          </section>
        </div>

        <br />
        <br />

        <h2 className="">New Collection from the Magic Team</h2>
        <div className="flex justify-center">
          <section className="inline-grid place-items-center gap-8 md:grid-cols-3 lg:grid-cols-4">
            {tokens.slice(0, 4).map((item, id) => (
              <CollectibleCard key={id} item={item} />
            ))}
          </section>
        </div>
      </section> */}
    </Layout>
  );
}
