import Image from "next/image";

const CommunityListItem = ({
  communityPicture,
  name,
}: {
  communityPicture: string;
  name: string;
}) => {
  return (
    <li>
      <a href="#" className="">
        <div className="group flex items-center">
          <Image
            src={communityPicture}
            width={65}
            height={65}
            alt=""
            className="rounded-full bg-orange-500"
          />
          <p className="ml-3 text-base font-medium text-gray-medium group-hover:text-gray-strong">
            {name}
          </p>
        </div>
      </a>
    </li>
  );
};

export default CommunityListItem;
