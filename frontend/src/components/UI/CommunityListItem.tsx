import { useUser } from "@/context/UserContext";
import { useWeaveDB } from "@/context/WeaveDBContext";
import Image from "next/image";
import Link from "next/link";

interface CommunityListItemProps {
  communityId: string;
}
const CommunityListItem = ({ communityId }: CommunityListItemProps) => {
  const { user } = useUser();
  const { allCommunities } = useWeaveDB();

  const community = allCommunities.find(
    (community) => communityId === community.communityId,
  );
  if (!community) return null;
  return (
    <li>
      <Link href={`/app/community/${communityId}`} className="">
        <div className="group flex items-center">
          <Image
            className="h-12 w-12 rounded-full object-cover "
            src={community.picture}
            width={65}
            height={65}
            alt=""
          />
          <p
            className={`ml-3 text-base font-medium ${
              "text-gray-medium  group-hover:text-gray-strong"
            }`}
          >
            {community.name}
          </p>
        </div>
      </Link>
    </li>
  );
};

export default CommunityListItem;
