import Layout from "@/components/Layout";
import { useUser } from "@/context/UserContext";
import { COMMUNITY_LIST } from "mock/communities";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import BenefitSelector from "../../../components/brand/BenefitSelector";
import CalendarSelector from "../../../components/brand/CalendarSelector";
import BenefitIllustration from "../../../components/brand/BenefitIllustration";
import Button from "../../../components/UI/Button";
import { DayRange } from "@amir04lm26/react-modern-calendar-date-picker";
import { BenefitOptions } from "../../../common/enums/benefit-options.enum";

const ManageBenefits = () => {
  const { user } = useUser();
  const router = useRouter();
  const { communityID } = router.query;
  const [benefitName, setBenefitName] = useState("");
  const [communityBenefit, setCommunityBenefit] =
    useState<BenefitOptions>(null);
  const [selectedDayRange, setSelectedDayRange] = useState<DayRange>({
    from: null,
    to: null,
  });
  const [selectedIllustration, setSelectedIllustration] = useState("");

  /**  @DEV to be implemented */
  const community = COMMUNITY_LIST.find(
    (community) => community.communityId === communityID,
  );

  const handleSubmit = () => {
    // TODO sent data
    alert('TODO: send data')
    console.log("sent");
  };

  return (
    <Layout title="Holders Only Area" className="">
      <Head>
        <title>Collectible - {community?.name}</title>
      </Head>

      <>
        <h2 className="mb-3 text-gray-strong">Benefit name</h2>
        <input
          name="benefit-name"
          type="text"
          placeholder={"Insert benefit name"}
          className={`mb-4 h-[52px] w-full rounded-lg bg-collectible-medium-purple p-4 text-gray-strong placeholder-gray-weak`}
          onChange={(e) => setBenefitName(e.target.value)}
          value={benefitName}
        />

        <div className="flex gap-8">
          <div className="w-1/2">
            <h2 className="mb-3 text-gray-strong">Benefit type</h2>
            <BenefitSelector
              
              benefit={communityBenefit}
              onSelectBenefit={setCommunityBenefit}
            />
          </div>
          <div className="w-1/2">
            <h2 className="mb-3 text-gray-strong">Date</h2>
            <CalendarSelector
              dateRange={selectedDayRange}
              onSelectDateRange={setSelectedDayRange}
            />
          </div>
        </div>

        <h2 className="my-3 text-gray-strong">Benefit illustration</h2>
        <BenefitIllustration
          illustrationName={selectedIllustration}
          onSelectIllustration={setSelectedIllustration}
        />

        <div className="mt-8 flex justify-end">
          <Button action={handleSubmit}>Publish Benefit</Button>
        </div>
      </>
    </Layout>
  );
};

export default ManageBenefits;
