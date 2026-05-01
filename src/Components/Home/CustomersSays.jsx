import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion } from "framer-motion";
import React, { useRef } from "react";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

function CustomersSays() {
  const swiperRef = useRef(null);

  const reviews = [
    {
      id: 1,
      name: "Rawan",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a ty",
    },
    {
      id: 2,
      name: "Ahmed",
      text: "It is a long established fact that a reader will be distracted by the readable content of a page when  industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a ty looking at its layout.",
    },
    {
      id: 3,
      name: "Mohamed",
      text: "It is a long established fact that a reader will be distracted by the readable content of a page when  industry's standard dummy text ever since the 1500s.",
    },
  ];
  console.log(motion);
  
  return (
    <div className="py-30 px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-nav text-primary text-2xl md:text-3xl font-semibold mb-10 capitalize tracking-tight">
          What our customers says
        </h2>
        <Swiper
          touchStartPreventDefault={false}
          edgeSwipeDetection={true}
          resistanceRatio={0}
          // التعديلات الجديدة هنا
          simulateTouch={true}
          nested={true}
          grabCursor={true} // بيغير شكل الماوس لإيد عشان يحسن الـ UX
          // باقي الكود بتاعك زي ما هو
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          modules={[Navigation, Autoplay]}
          autoplay={{ delay: 3000 }} // زودت الـ delay شوية عشان ميبقاش سريع بزيادة ويشتت المتصفح
          loop={true}
          
          className="mb-6"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id} >
              <motion.div
              whileHover={{scale: 1.02}}
              transition={{duration: 0.3}}
              className="space-y-6">
                <p className="font-third text-2xl md:text-xl text-third leading-relaxed italic px-4 md:px-20">
                  {review.text}
                </p>
                <h1 className="font-secondary text-black font-bold text-lg tracking-widest uppercase">
                  {review.name}
                </h1>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* Buttons */}
        <div className="flex items-center justify-center gap-5">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="text-black hover:text-primary transition-colors duration-300"
          >
            <IconArrowLeft size={40} stroke={2} />
          </button>
          <button onClick={() => swiperRef.current?.slideNext()}>
            <IconArrowRight
              size={40}
              stroke={2}
              className="text-black hover:text-primary transition-colors duration-300"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
export default CustomersSays;

