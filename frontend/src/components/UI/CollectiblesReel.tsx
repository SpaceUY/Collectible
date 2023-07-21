import { A11y, Navigation, Pagination, Mousewheel } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import CollectibleCard from "./CollectibleCard";
import { CollectibleCardProps } from "../../common/interfaces/collectable-card-props.interface";

interface CollectiblesReelProps {
  collectibleCards: CollectibleCardProps[];
  headerText?: string;
}

const CollectiblesReel = ({
  collectibleCards,
  headerText,
}: CollectiblesReelProps) => {
  return (
    <div>
      {headerText && (
        <h2 className="mb-4 text-xl font-semibold text-gray-strong">
          {headerText}
        </h2>
      )}
      <div className="relative">
        {/* <div className="absolute top-0 left-0 z-20 h-full w-[90px] rounded-lg bg-gradient-to-l from-transparent to-collectible-dark-purple/60"></div> */}
        <div className="absolute top-0 right-0 z-20 h-full w-[80px] rounded-lg bg-gradient-to-r from-transparent to-collectible-dark-purple/70"></div>
        <Swiper
          modules={[Navigation, A11y, Pagination, Mousewheel]}
          spaceBetween={10}
          slidesPerView={4}
          // slidesOffsetAfter={100}
          // slidesOffsetBefore={100}
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
          mousewheel={true} // Enable mousewheel control here
        >
          {collectibleCards.map((collectible) => (
            <SwiperSlide key={collectible.name}>
              <CollectibleCard
                description={collectible.description}
                name={collectible.name}
                pictureUrl={collectible.pictureUrl}
                tokenID={collectible.tokenID}
                collectionID={collectible.collectionID}
                communityID={collectible.communityID}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default CollectiblesReel;
