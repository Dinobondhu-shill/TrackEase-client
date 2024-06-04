import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import slide1 from "../../../public/hrslider.jpg"
import slide2 from "../../../public/employee.jpg"
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <Swiper
    modules={[Navigation, Pagination]}
    spaceBetween={50}
    slidesPerView={1}
    navigation
    autoplay
    loop
  >
    <SwiperSlide className="relative">
      <img src={slide1} className="w-full h-screen object-cover" />
      <div className="absolute top-2/4 ml-32 transform -translate-y-1/2  z-20">
        <h2 className="text-6xl mb-5 font-bold text-[#7be8f4da]">Join As A HR Manager!</h2>
        <p className="text-lg w-2/3  my-8 text-white">We're looking for a passionate and experienced HR Manager to help us grow and support our incredible team. If you're dedicated to fostering a positive work environment and have a knack for people management, we'd love to hear from you.</p>
        <Link className="px-4 py-2 border text-[#7be8f4da] border-blue-400 rounded-xl">Join As HR Manager</Link>
      </div>


    </SwiperSlide>
    <SwiperSlide>
      <img src={slide2} className="w-full h-screen object-cover" />
      </SwiperSlide>
  </Swiper>
  );
};

export default Banner;