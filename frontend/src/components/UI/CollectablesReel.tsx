import { A11y, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import CollectableCard, { CollectiveCardProps } from "./CollectableCard";

const CollectablesReel = () => {
  const cards: CollectiveCardProps[] = [
    {
      pictureUrl: "",
      description: "adfa",
      name: "aloja",
      showPictureOnly: false,
    },
    {
      pictureUrl: "",
      description: "adfa",
      name: "alds",
      showPictureOnly: false,
    },
    {
      pictureUrl: "",
      description: "adfa",
      name: "aaoja",
      showPictureOnly: false,
    },
    {
      pictureUrl: "",
      description: "adfa",
      name: "alojsa",
      showPictureOnly: false,
    },
    {
      pictureUrl: "",
      description: "adfa",
      name: "alosadja",
      showPictureOnly: false,
    },
  ];

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
        {cards.map((collectible) => (
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
