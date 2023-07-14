import { useEffect, useState } from "react";
import { COMMUNITY_POSTS } from "../../../mock/community-post";
import CommunityPost from "../UI/CommunityPost";
import { COMMUNITY_BENEFITS } from "mock/benefits";
import BenefitCard from "../UI/BenefitCard";
import { Community } from "../../common/types/Community.type";
import { useWeaveDB } from "../../context/WeaveDBContext";
import { Benefit } from "../../common/types/Benefit.type";
import { BenefitType } from "../../common/interfaces/community-benefit.interface";
import LoadingWheel from "../UI/LoadingWheel";

interface CommunityBenefitsProps {
  community: Community;
  isMember: boolean;
}
const CommunityBenefits = ({ community, isMember }: CommunityBenefitsProps) => {
  const { weaveDB } = useWeaveDB();
  const [isLoading, setIsLoading] = useState(false);
  const [communityBenefits, setCommunityBenefits] = useState<Benefit[]>([]);

  const fetchBenefits = async () => {
    const benefits = await weaveDB.getCommunityBenefits(community.id);
    if (benefits) setCommunityBenefits(benefits);
  };

  useEffect(() => {
    fetchBenefits();
  }, []);

  return !isLoading ? (
    <div>
      <h3 className="mb-4 text-xl font-semibold text-gray-strong">
        Available Benefits for {community.data.name} members
      </h3>
      <div className="mb-40 flex gap-4">
        {/* {communityBenefits.map((benefit) => (
          <BenefitCard
            key={benefit.id}
            id={benefit.id}
            name={benefit.data.name}
            description={benefit.data.} // TODO content
            image={benefit.data.} // TODO content
            type={benefit.data.type as unknown as BenefitType}
            isMember={isMember}
          />
        ))} */}
      </div>
    </div>
  ) : (
    <div className="h-56">
      <LoadingWheel />
    </div>
  );
};

export default CommunityBenefits;
