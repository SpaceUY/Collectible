import { A11y, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import CollectableCard from "./CollectableCard";
import { CollectiveCardProps } from "../../common/interfaces/collective-card-props.interface";

const CollectablesReel = ({
  collectibleCards,
}: {
  collectibleCards: CollectiveCardProps[];
}) => {
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

export default CollectablesReel;
