import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Autoplay, Navigation } from "swiper/modules";

import { mockDataImage1, mockdataImagebutton } from "../../../mockdata/page";

const ContentCarousel = () => {
  return (
    <div className="space-y-6">
  {/* Main Image Swiper */}
  <Swiper
    pagination={{ clickable: true }}
    modules={[Pagination, Autoplay]}
    autoplay={{
      delay: 2500,
      disableOnInteraction: false,
    }}
    className="mySwiper h-[320px] rounded-md overflow-hidden shadow-lg border border-gray-200 mb-6"
  >
    {mockDataImage1?.map((item, index) => (
      <SwiperSlide key={index}>
        <img
          src={item.image}
          alt=""
          className="h-full w-full object-cover"
        />
      </SwiperSlide>
    ))}
  </Swiper>

  {/* Thumbnail Swiper */}
  <Swiper
    slidesPerView={5}
    spaceBetween={15}
    pagination={{ clickable: true }}
    navigation={true}
    modules={[Pagination, Autoplay, Navigation]}
    autoplay={{
      delay: 2500,
      disableOnInteraction: false,
    }}
    className="mySwiper rounded-md shadow-md"
  >
    {mockdataImagebutton?.map((item, index) => (
      <SwiperSlide key={index}>
        <img
          className="rounded-md h-32 w-full border-2 border-gray-300 hover:border-blue-500 transition-all duration-300 cursor-pointer"
          src={item.image}
          alt=""
        />
      </SwiperSlide>
    ))}
  </Swiper>
</div>
  );
};

export default ContentCarousel;
