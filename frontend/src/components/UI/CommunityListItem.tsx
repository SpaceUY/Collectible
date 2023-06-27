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
            className="rounded-full bg-gray-strong w-12 h-12 object-cover "
            src={communityPicture}
            width={65}
            height={65}
            alt=""
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
