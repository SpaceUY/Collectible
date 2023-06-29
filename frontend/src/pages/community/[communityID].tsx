import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import CommunityOverviewCard from "../../components/home/CommunityOverviewCard";
import Button from "../../components/UI/Button";
import { COMMUNITY_LIST } from "mock/community";
import Feed from "../../components/community/Feed";

enum CommunityTabs {
  FEED = "feed",
  BENEFITS = "benefits",
  COLLECTION = "collection",
}

const communitySections = [
  { tabName: "Feed", tabParam: CommunityTabs.FEED },
  { tabName: "Benefits", tabParam: CommunityTabs.BENEFITS },
  { tabName: "Collection", tabParam: CommunityTabs.COLLECTION },
];

export default function CollectiblesPage() {
  const { user } = useUser();
  const router = useRouter();
  const { communityID } = router.query; // TODO content
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  // initialize the state used to track the current page's data
  const [loading, setLoading] = useState(user?.refreshCollectibles);
  const [selectedSectionParam, setSelectedSectionParam] =
    useState<CommunityTabs>(CommunityTabs.FEED);

  /**  @DEV to be implemented */
  const community = COMMUNITY_LIST.find(
    (community) => community.id === communityID,
  );

  useEffect(() => {
    if (Object.values(CommunityTabs).includes(tab as CommunityTabs)) {
      setSelectedSectionParam(tab as CommunityTabs);
    }

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
  }, [user?.address, user?.refreshCollectibles, user?.collectibles, tab]);

  const handleTabSelection = (sectionParam: CommunityTabs) => {
    router.replace({ query: { ...router.query, tab: sectionParam } });
  };

  return (
    <Layout title="Holders Only Area" className="">
      <CommunityOverviewCard
        description={community?.description}
        communityName={community?.name}
        communityPicture={community?.communityPicture}
      />

      <div className="mt-10 mb-4 flex gap-5">
        {communitySections.map((section) => {
          const buttonVariant =
            section.tabParam === selectedSectionParam ? "purple" : "outlined";

          return (
            <Button
              variant={buttonVariant}
              key={section.tabName}
              action={() => handleTabSelection(section.tabParam)}
            >
              {section.tabName}
            </Button>
          );
        })}
      </div>

      <div className="flex flex-col gap-5">
        {selectedSectionParam === CommunityTabs.FEED && <Feed />}
        {selectedSectionParam === CommunityTabs.BENEFITS && <>benefits</>}
        {selectedSectionParam === CommunityTabs.COLLECTION && <>collection</>}
      </div>
    </Layout>
  );
}
