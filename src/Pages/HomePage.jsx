import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import homeImg1 from "../assets/Home.jpg";
import homeImg2 from "../assets/Home2.jpg";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Link } from "react-router-dom";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
// import BestSelling from "../Components/Home/BestSelling";
import BrandVideo from "../Components/Home/BrandVideo";
import CustomersSays from "../Components/Home/CustomersSays";
// import OfferSection from "../Components/Home/OfferSectionLeft";
import OfferSectionLeft from "../Components/Home/OfferSectionLeft";
import { FaArrowUp } from "react-icons/fa";
// import CategoriesSection from "../Components/Home/CategoriesSection";
import InstagramGallery from "../Components/Home/CategoriesSection";
// import NewArrivals from "../Components/Home/NewArrivals";

export default function HomePage() {
  const [showBtn, setShowBtn] = useState(false);
  const handleScroll = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const swiperRef = useRef(null);
  const slides = [
    {
      id: 1,
      img: homeImg1,
      title: "Handmade Pottery",
      subtitle: "Crafted with Passion",
    },
    {
      id: 2,
      img: homeImg2,
      title: "Unique Designs",
      subtitle: " Crafted with Passion",
    },
  ];
useEffect(()=> {
  window.addEventListener("scroll", () => {
    setShowBtn(window.scrollY > 300);
  });
}, [])
  return (
    <div>
      <div className="relative h-screen w-full group ">
        <Swiper
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          modules={[Pagination, Autoplay, EffectFade]}
          effect={"fade"}
          speed={1500}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          className="h-full w-full"
          pagination={{
            clickable: true,
            renderBullet: (index, bullet) => {
              return `<span class="${bullet} custom-bullet"></span>`;
            },
          }}
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="relative h-full w-full overflow-hidden">
                <img
                  src={slide.img}
                  alt={slide.title}
                  className="h-full w-full object-cover transition-transform duration-5000 scale-100 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-linear-to-b from-black/60 via-transparent to-black/40"></div>

                {/* text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 px-4">
                  <p className="font-sans text-sm flex uppercase tracking-[0.4em] mb-4 animate-fadeIn">
                    {slide.subtitle}
                  </p>
                  <h1 className="font-nav text-4xl md:text-6xl tracking-tight text-center leading-tight">
                    {slide.title}
                  </h1>

                  <Link
                    to={"/shop"}
                    className=" mt-8 px-8 py-3 border border-white text-white text-xs rounded-md tracking-widest cursor-pointer hover:bg-white hover:text-black transition-all duration-300"
                  >
                    Discover Collection
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* Custom Navigation Arrows */}
        <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-6 z-20 pointer-events-none">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="pointer-events-auto w-12 h-12 bg-white/30 rounded-full flex items-center justify-center text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500"
          >
            <HiOutlineChevronLeft size={24} />
          </button>

          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="pointer-events-auto w-12 h-12 bg-white/30 rounded-full flex items-center justify-center text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-500"
          >
            <HiOutlineChevronRight size={24} />
          </button>
        </div>
      </div>
      {/* about */}
      <div className=" pb-30 ">
        <div className=" flex md:flex-col md:items-center md:justify-center h-full mt-33  ">
          <div className=" w-178 ">
            <h1 className="text-xl font-bold font-nav text-primary pb-3 pl-3 md:pl-0">
              About us
            </h1>
            <div className=" text-center">
              <span className=" font-secondary text-3xl font-text-semibold md:text-4xl italic ">
                Logo is the only best online store for varieties of collection
                of clean and beautiful vases.
              </span>

              <p className=" pt-6 font-third text-third">
                Et id sapien id enim, sit tempor cursus elit, fusce. Nunc
                tristique facilisis consectetur at vivamus ut porta porta. Ut
                nisl, tortor, aliquam blandit vitae vehicula vivamus leo nullam
                urna, scelerisque unc lectus phasellus adipiscing arcu.
                Tristique facilisis nunc consectetur at tempor cursusut porta.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* products */}
      <div>
        <BrandVideo />
      </div>
      <div>
        <CustomersSays />
      </div>
      <div>
        <OfferSectionLeft />
      </div>
      <InstagramGallery />
      <div className="relative">
          {showBtn && (
        <button
          onClick={handleScroll}
          className="animate-bounce fixed bottom-6 right-6 w-10 h-10 bg-primary flex items-center justify-center text-white rounded-full"
        >
          <FaArrowUp />
        </button>
          )}
      </div>
    </div>
  );
}
