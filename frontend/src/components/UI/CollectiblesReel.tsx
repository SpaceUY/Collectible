import { A11y, Navigation, Pagination, Mousewheel } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import CollectibleCard from "./CollectibleCard";
import { CollectionWithNfts, AlchemyNFT } from "../../../types";
import { formatTime } from "utils/functions";

interface CollectiblesReelProps {
  nfts: AlchemyNFT[];
  headerText?: string;
  creationDate?: string;
}

const CollectiblesReel = ({
  nfts,
  headerText,
  creationDate,
}: CollectiblesReelProps) => {
  return (
    <div>
      {(headerText || creationDate) && (
        <div className="mb-4 flex items-center gap-4">
          {headerText && (
            <h2 className="text-lg font-semibold text-gray-strong">
              {headerText}
            </h2>
          )}
          {creationDate && (
            <p className="text-sm text-gray-medium">
              {formatTime(creationDate)}
            </p>
          )}
        </div>
      )}
      <div className="relative">
        {/* <div className="absolute top-0 left-0 z-20 h-full w-[90px] rounded-lg bg-gradient-to-l from-transparent to-collectible-dark-purple/60"></div> */}
        <div className="absolute right-0 top-0 z-20 h-full w-[80px] rounded-lg bg-gradient-to-r from-transparent to-collectible-dark-purple/70"></div>
        <Swiper
          modules={[Navigation, A11y, Pagination, Mousewheel]}
          spaceBetween={10}
          slidesPerView={4}
          breakpoints={{
            640: {
              slidesPerView: 2.2,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 4.2,
              spaceBetween: 10,
            },
            1900: {
              slidesPerView: 5.2,
              spaceBetween: 12,
            },
          }}
          mousewheel={nfts.length >= 4} // Enable mousewheel control here
        >
          {nfts.map((nft) => (
            <SwiperSlide key={nft.tokenId}>
              <CollectibleCard nft={nft} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default CollectiblesReel;
