import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import LoadingWrapper from "@/components/LoadingWrapper";
import LoginWithMagic from "@/components/LoginWithMagic";
import MerchForm from "@/components/MerchForm";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";

export default function CollectiblesPage() {
  const { user } = useUser();
  const router = useRouter();
  const { communityID } = router.query;
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
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
    <Layout title="Holders Only Area" className="">
      <></>
    </Layout>
  );
}
