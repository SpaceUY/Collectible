import { A11y, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import CollectableCard from "./CollectibleCard";
import { CollectableCardProps } from "../../common/interfaces/collectable-card-props.interface";

interface CollectiblesReelProps {
  collectibleCards: CollectableCardProps[];
}

const CollectiblesReel = ({ collectibleCards }: CollectiblesReelProps) => {
  return (
    <div className="my-5 w-auto">
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
            <CollectableCard
              description={collectible.description}
              name={collectible.name}
              pictureUrl={collectible.pictureUrl}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CollectiblesReel;
