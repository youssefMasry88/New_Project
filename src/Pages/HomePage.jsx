import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Link } from "react-router-dom";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import BrandVideo from "../Components/Home/BrandVideo";
import CustomersSays from "../Components/Home/CustomersSays";
import OfferSectionLeft from "../Components/Home/OfferSectionLeft";
import { FaArrowUp } from "react-icons/fa";
import InstagramGallery from "../Components/Home/CategoriesSection";
import { getHeroSlides } from "../services/heroService";
import { getHomepage } from "../services/homepageService";
import { getMediaUrl } from "../services/api";

export default function HomePage() {
  const [showBtn, setShowBtn] = useState(false);
  const handleScroll = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const swiperRef = useRef(null);
  const [slides, setSlides] = useState([]);
  const [homepage, setHomepage] = useState(null);

  useEffect(() => {
    const fetchHomepage = async () => {
      try {
        const data = await getHomepage();
        setHomepage(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchHomepage();
  }, []);
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const data = await getHeroSlides();
        setSlides(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSlides();
  }, []);
useEffect(() => {
  const handleScroll = () => {
    setShowBtn(window.scrollY > 300);
  };

  window.addEventListener("scroll", handleScroll);

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);
  return (
    <div>
      <div className="h-[80vh] min-h-150 md:h-screen w-full group relative">
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          modules={[Pagination, Autoplay, EffectFade]}
          effect="fade"
          speed={800}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          rewind={true}
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
                  src={getMediaUrl(slide.image?.url)}
                  alt={slide.title}
                  className="h-full w-full object-cover transition-transform duration-5000 scale-100 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-linear-to-b from-black/60 via-transparent to-black/40"></div>

                {/* text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 px-4">
                  <p className="font-sans text-[10px] sm:text-xs md:text-sm flex uppercase tracking-[0.25em] sm:tracking-[0.4em] mb-3 md:mb-4 text-center">
                    {slide.subtitle}
                  </p>
                  <h1 className="font-nav text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-center leading-tight px-4">
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
            onClick={() => {
              swiperRef.current?.slideNext();
            }}
            className="pointer-events-auto w-12 h-12 bg-white/30 rounded-full flex items-center justify-center text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-500"
          >
            <HiOutlineChevronRight size={24} />
          </button>
        </div>
      </div>
      {/* about */}
      <div className=" px-5 sm:pb-8 md:pb-12 lg:pb-20 pb-20 2xl:pb-30">
        <div className=" flex flex-col items-center justify-center mt-20 md:mt-33  ">
          <div className=" w-full max-w-4xl">
            <h1 className=" text-lg sm:text-xl font-bold font-nav text-primary pb-3 text-center md:text-left">
              {homepage?.aboutTitle}
            </h1>
            <div className=" text-center">
              <span className=" font-secondary text-2xl sm:text-3xl md:text-4xl italic leading-relaxed">
                {homepage?.aboutHeading}
              </span>
              <p className="pt-5 md:pt-6 font-third text-third text-sm sm:text-base leading-7 md:leading-8">
                {homepage?.aboutDescription}
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
