import Image from "next/image";

interface CollectibleCardSkeletonProps {
  hidden?: boolean;
}

const CollectibleCardSkeleton = ({ hidden }: CollectibleCardSkeletonProps) => {
  return (
    <div
      className={`shadow-brand mx-auto animate-pulse overflow-hidden rounded-lg border border-gray-600 bg-gray-600 ${
        hidden ? "!opacity-0" : ""
      }`}
    >
      <div className="h-56 w-48 bg-gray-700 bg-opacity-80 " />
    </div>
  );
};

export default CollectibleCardSkeleton;
