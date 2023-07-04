import { A11y, Navigation, Pagination } from "swiper";
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
      <Swiper
        modules={[Navigation, A11y, Pagination]}
        spaceBetween={10}
        slidesPerView={4}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
        }}
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
  );
};

export default CollectiblesReel;
