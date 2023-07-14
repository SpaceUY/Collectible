import Image from "next/image";
import Link from "next/link";
import { nameToUrl } from "utils/functions";
import { Community } from "../../common/types/Community.type";

const CommunityListItem = ({ community }: { community: Community }) => {
  //console.log("dasdsadsadasdas", key);
  const { logo, name } = community.data;

  return (
    <li>
      <Link href={`/community/${community.id}`} className="">
        <div className="group flex items-center">
          <Image
            className="h-12 w-12 rounded-full bg-gray-strong object-cover "
            src={logo}
            width={65}
            height={65}
            alt=""
          />
          <p className="ml-3 text-base font-medium text-gray-medium group-hover:text-gray-strong">
            {name}
          </p>
        </div>
      </Link>
    </li>
  );
};

export default CommunityListItem;
