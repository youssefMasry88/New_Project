import React from "react";
import home from "../../assets/Home2.jpg";
import Hand1 from "../../assets/Hand1.jpg";
import { Link } from "react-router-dom";
import Aos from "aos";
export default function OfferSectionLeft() {
  Aos.init();
  return (
<div>
      <section className="py-10">
      <div className="max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        <div className="relative overflow-hidden group rounded-r-xl" data-aos="fade-right" data-aos-duration="2000">
          <img
            src={Hand1}
            alt=""
            className=" w-full h-165 object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Title */}
          <div className="absolute bottom-30 left-10 space-y-2"data-aos="fade-up" data-aos-duration="2500">
            <h3 className="font-nav text-primary text-3xl " >
              Old Hand Made
            </h3>
            <Link>
              <span className="font-nav  text-sm text-secondary underline hover:text-primary ">
                shop it Now
              </span>
            </Link>
          </div>
        </div>
        <div className="space-y-8">
          <div className="space-y-4 ">
            <span className=" text-secondary text-sm capitalize ">
              Limited Time Offer
            </span>
            <h2 className="font-secondary text-primary text-2xl md:text-4xl font-bold capitalize ">
              Lorem Ipsum is simply dummy text of the printing.
            </h2>
          </div>

          <p className="font-third md:text-sm text-third leading-relaxed" data-aos="fade-up" data-aos-duration="1000">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            <button data-aos="fade-up" data-aos-duration="3000" className="bg-secondary text-white  text-xs font-bold uppercase tracking-widest px-12 py-4 rounded-sm hover:bg-primary transition-all shadow-lg active:scale-95">
              Buy It Now
            </button>
        </div>
      </div>
    </section>


    <section className="bg-tertiary py-20 ">
      <div className=" max-w-8xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        

        {/* الجزء الأيمن: المحتوى النصي */}
        <div className="px-6 space-y-8 ">
          <div className="space-y-4">
            <span className=" text-secondary text-sm uppercase tracking-[0.3em]">
              Limited Time Offer
            </span>
            <h2 className="font-modern text-primary text-2xl md:text-4xl font-bold capitalize">
              Lorem Ipsum is simply dummy text of the printing.
            </h2>
          </div>

          <p className="font-third md:text-sm text-third leading-relaxed" data-aos="fade-up" data-aos-duration="1500">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
          </p>

          <button data-aos="fade-up" data-aos-duration="3000" className="bg-secondary text-white font-modern text-xs font-bold uppercase tracking-widest px-12 py-4 rounded-sm hover:bg-primary transition-all shadow-lg active:scale-95">
            Buy It Now
          </button>
        </div>


        {/* الجزء الأيسر: الصورة مع النص المتراكب */}
        <div className="relative group overflow-hidden rounded-l-xl" >
          <img 
            src={home} 
            alt="Handmade Pottery" 
            data-aos="fade-left" data-aos-duration="1500"
            className=" w-full h-[702px] object-cover transition-transform duration-700 group-hover:scale-105"
          /> 
          {/* النص اللي فوق الصورة */}
          <div className="absolute bottom-10 left-10 space-y-2" data-aos="fade-up" data-aos-duration="3000" >
            <h3 className="font-modern text-primary text-3xl font-bold">
              Old Hand Made
            </h3>
            <button className="text-white border-b border-white text-xs uppercase tracking-[0.2em] hover:text-primary hover:border-primary transition-colors">
              shop it Now
            </button>
          </div>
        </div>
      </div>
    </section>
  
  <section className="py-10">
      <div className="max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        <div className="relative overflow-hidden group rounded-r-xl" data-aos="fade-right" data-aos-duration="2000">
          <img
            src={Hand1}
            alt=""
            className=" w-full h-165 object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Title */}
          <div className="absolute bottom-30 left-10 space-y-2"data-aos="fade-up" data-aos-duration="2500">
            <h3 className="font-nav text-primary text-3xl " >
              Old Hand Made
            </h3>
            <Link>
              <span className="font-nav  text-sm text-secondary underline hover:text-primary ">
                shop it Now
              </span>
            </Link>
          </div>
        </div>
        <div className="space-y-8">
          <div className="space-y-4 ">
            <span className="font-modern text-secondary text-sm capitalize ">
              Limited Time Offer
            </span>
            <h2 className="font-modern text-primary text-2xl md:text-4xl font-bold capitalize ">
              Lorem Ipsum is simply dummy text of the printing.
            </h2>
          </div>

          <p className="font-third md:text-sm text-third leading-relaxed" data-aos="fade-up" data-aos-duration="1000">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            <button data-aos="fade-up" data-aos-duration="3000" className="bg-secondary text-white font-modern text-xs font-bold uppercase tracking-widest px-12 py-4 rounded-sm hover:bg-primary transition-all shadow-lg active:scale-95">
              Buy It Now
            </button>
        </div>
      </div>
    </section>


</div>



  );
}

