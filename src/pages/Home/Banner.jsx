import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import slide1 from "../../../public/hrslider.jpg"
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Banner = () => {
  return (
    <Swiper
    modules={[Navigation, Pagination]}
    spaceBetween={50}
    slidesPerView={1}
    navigation
    autoplay
    loop
    pagination={{ clickable: true }}
  >
    <SwiperSlide>
      <img src={slide1} className="w-full h-screen object-cover" />
    </SwiperSlide>
    <SwiperSlide>
      <img src={slide1} className="w-full h-screen object-cover" />
      </SwiperSlide>
  </Swiper>
  );
};

export default Banner;