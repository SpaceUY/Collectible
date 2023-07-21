import { useState } from "react";
import { COMMUNITY_POSTS } from "../../../mock/community-post";
import CommunityPost from "../UI/CommunityPost";
import { COMMUNITY_BENEFITS } from "mock/benefits";
import BenefitCard from "../UI/BenefitCard";

interface CommunityBenefitsProps {
  communityId: string;
  communityName: string;
  isMember: boolean;
}
const CommunityBenefits = ({
  communityId,
  communityName,
  isMember,
}: CommunityBenefitsProps) => {
  const [isLoading, setIsLoading] = useState(false);

  // TODO fetch by id
  const communityPostsById = COMMUNITY_POSTS.filter(
    (post) => post.communityId === communityId,
  );

  return !isLoading ? (
    <div>
      <h3 className="mb-4 text-xl font-semibold text-gray-strong">
        Available Benefits for {communityName} members
      </h3>
      <div className="mb-40 flex gap-4">
        {COMMUNITY_BENEFITS.map((benefit) => (
          <BenefitCard
            key={benefit.id}
            id={benefit.id}
            name={benefit.name}
            description={benefit.description}
            image={benefit.image}
            type={benefit.type}
            isMember={isMember}
          />
        ))}
      </div>
    </div>
  ) : (
    <> TODO LOADING wheel or skeleton? </>
  );
};

export default CommunityBenefits;
