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
      <div className="w-full h-full bg-[#1c1b1b37] z-10 absolute top-0 left-0"></div>
      <div className="absolute top-2/4 ml-32 transform -translate-y-1/2  z-20">
        <h2 className="text-6xl mb-5 font-bold text-[#7be8f4da]">Join As A HR Manager!</h2>
        <p className="text-lg w-2/3  my-8 text-white">We're looking for a passionate and experienced HR Manager to help us grow and support our incredible team. If you're dedicated to fostering a positive work environment and have a knack for people management, we'd love to hear from you.</p>
        <Link to={'/join-as-hr'} className="px-4 py-2 border text-[#7be8f4da] border-blue-400 rounded-xl">Join As HR Manager</Link>
      </div>


    </SwiperSlide>
    <SwiperSlide className="relative">
      <div className="w-full h-full bg-[#1c1b1b37] z-10 absolute top-0 left-0"></div>
      <img src={slide2} className="w-full h-screen object-cover" />
      <div className="absolute top-2/4 ml-32 transform -translate-y-1/2  z-20">
        <h2 className="text-6xl mb-5 font-bold text-[#7be8f4da]">Join As A Employee!</h2>
        <p className="text-lg w-2/3  my-8 text-white">We are on the lookout for dedicated and talented individuals to join our team. Whether you are just starting your career or looking to advance, we offer a dynamic and supportive work environment. Be part of our exciting journey and make a difference with us.</p>
        <Link to={'/join-as-employee'} className="px-4 py-2 border font-bold text-[#7be8f4da] border-blue-400 rounded-xl">Join As Employee</Link>
      </div>
      </SwiperSlide>
  </Swiper>
  );
};

export default Banner;