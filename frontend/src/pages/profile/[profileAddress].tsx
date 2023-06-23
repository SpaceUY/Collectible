import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import CollectibleCard from "@/components/CollectibleCard";
import { useRouter } from "next/router";
import Image from "next/image";
import { useWeb3 } from "@/context/Web3Context";
import { fetchNFTs } from "@/api/nftApi";
import { getAddressShortcut } from "@/api/accountApi";
import CollectibleCardSkeleton from "@/components/CollectibleCardSkeleton";

export default function CollectiblesPage() {
  const { user } = useUser();
  const router = useRouter();
  const { profileAddress } = router.query;
  const { contract } = useWeb3();

  const [profileCollectibles, setProfileCollectibles] = useState([]);
  const [loadingCollectibles, setLoadingCollectibles] = useState(true);

  // initialize the state used to track the current page's data
  //const [loading, setLoading] = useState(user?.refreshCollectibles);

  // useEffect(() => {
  //   // do nothing if the user is not logged in
  //   if (!user?.address) {
  //     setLoading(true);
  //     return;
  //   }

  //   // disable the loading after collectibles have already been loaded
  //   if (user?.address && !user?.refreshCollectibles && user?.collectibles) {
  //     setLoading(false);
  //     return;
  //   }
  // }, [user?.address, user?.refreshCollectibles, user?.collectibles]);

  useEffect(() => {
    const fetchProfileNFTs = async () => {
      setLoadingCollectibles(true);
      const res = await fetchNFTs(profileAddress, contract);
      if (Array.isArray(res)) {
        setProfileCollectibles(res.reverse());
      }
      setLoadingCollectibles(false);
    };
    fetchProfileNFTs();
  }, [profileAddress, contract]);

  return (
    <Layout title="Profile" className="">
      <div className="flex items-center gap-4">
        <div className="rounded-full border-[1px] bg-gray-strong">
          <Image
            /** 
               @DEV remove opacity-0 to display image
            **/
            className="h-16 w-16 rounded-full border-gray-strong opacity-0"
            src={"collectible-logo.svg"}
            width={50}
            height={50}
            alt="Collectible Logo"
          />
        </div>
        <span className="flex flex-col">
          <p className="text-lg font-semibold text-gray-strong opacity-50 ">
            userName
          </p>
          <p className="text-sm text-gray-strong opacity-50">
            {getAddressShortcut((profileAddress as string) || "")}
          </p>
        </span>
      </div>

      <div className="flex flex-col justify-center gap-2">
        <h3 className="text-2xl font-semibold text-gray-strong">
          Collectibles
        </h3>
        <section className="inline-grid gap-8 md:grid-cols-3 lg:grid-cols-4">
          {loadingCollectibles ? (
            <>
              <CollectibleCardSkeleton />
              <CollectibleCardSkeleton />
              <CollectibleCardSkeleton />
              <CollectibleCardSkeleton />
            </>
          ) : profileCollectibles.length > 0 ? (
            profileCollectibles.map((uri, id) => (
              <CollectibleCard key={id} tokenURI={uri} />
            ))
          ) : (
            <CollectibleCardSkeleton hidden />
          )}
        </section>
      </div>

      <div className="flex flex-col justify-center gap-2">
        <h3 className="text-2xl font-semibold text-gray-strong">Communities</h3>
        <section className="inline-grid gap-8 md:grid-cols-3 lg:grid-cols-4">
          {loadingCollectibles ? (
            <>
              <CollectibleCardSkeleton />
              <CollectibleCardSkeleton />
              <CollectibleCardSkeleton />
              <CollectibleCardSkeleton />
            </>
          ) : profileCollectibles.length > 0 ? (
            profileCollectibles.map((uri, id) => (
              <CollectibleCard key={id} tokenURI={uri} />
            ))
          ) : (
            <CollectibleCardSkeleton hidden />
          )}
        </section>
      </div>
      
    </Layout>
  );
}
