import BenefitCard from "../UI/BenefitCard";
import { Community } from "../../../types";
interface CommunityBenefitsProps {
  community: Community;
  isMember: boolean;
  isOwner: boolean;
}
const CommunityBenefits = ({
  community,
  isMember,
  isOwner,
}: CommunityBenefitsProps) => {
  const { benefits } = community;

  return (
    <div>
      {/* {benefits.length === 0 && (
        <h3 className="mb-4 ml-4 text-sm font-semibold text-gray-strong/90">
          The {community.name} community is soon to unveil exclusive benefits.
          Stay tuned!
        </h3>
      )} */}
      {benefits.length > 0 && (
        <h3 className="mb-4 text-xl font-semibold text-gray-strong">
          Available Benefits for {community.name} members
        </h3>
      )}

      <div className="mb-40 flex gap-4">
        {benefits.map((benefit, idx) => (
          <BenefitCard
            key={benefit.benefitId}
            benefit={benefit}
            isMember={isMember}
            isOwner={isOwner}
          />
        ))}
      </div>
    </div>
  );
};

export default CommunityBenefits;
