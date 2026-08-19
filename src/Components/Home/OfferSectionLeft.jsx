import React, { useEffect, useState } from "react";

import Hand1 from "../../assets/Hand1.jpg";
import { Link } from "react-router-dom";
import Aos from "aos";
import { getOffers } from "../../services/offerService";
export default function OfferSectionLeft() {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    Aos.init({ once: true });
    const fetchOffers = async () => {
      try {
        const data = await getOffers();
        setOffers(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOffers();
  }, []);
      return (
  <div className="overflow-x-hidden">
      {offers.map((offer, index) => {
        const isReversed = index === 1;
        return (
          
        
        <section className={isReversed ? "bg-tertiary py-20" : "py-10" } key={offer.id}>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-0 items-center">

            {/* IMAGE */}
            <div
              className={`relative overflow-hidden group ${isReversed ? "md:order-2 rounded-l-xl" : "rounded-r-xl"}`}
              data-aos={isReversed ? "fade-left" : "fade-right"}
              data-aos-duration="1500"
            >
              <img
                src={offer.image.url
                  ? `https://homey-strapi.onrender.com${offer.image.url}`
                  : ""
                }
                alt={offer.heading || offer.title}
                className=" w-full h-165 object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Title */}

              <div
                className="absolute bottom-30 left-10 space-y-2"
                data-aos="fade-up"
                data-aos-duration="2500"
              >
                <h3 className="font-nav text-primary text-3xl ">
                  {offer.title}
                </h3>
                <Link to={offer.buttonLink || "/shop"}>
                  <span className="font-nav  text-sm text-secondary underline hover:text-primary ">
                    {offer.buttonText || "Shop Now"}
                  </span>
                </Link>
              </div>
            </div>

            {/* content */}

            <div className={`px-10 md:px-20 lg:px-24 space-y-4 ${isReversed ? "md:order-1" : ""}`}>
              <div className="space-y-4  ">
                <span className=" text-secondary text-sm capitalize ">
                  {offer.title}
                </span>
                <h2 className="font-secondary text-primary text-2xl md:text-4xl font-bold capitalize ">
                  {offer.heading}
                </h2>
              </div>

              <p
                className="font-third md:text-sm text-third leading-relaxed"
                data-aos="fade-up"
                data-aos-duration="1000"
              >
                {offer.description}
              </p>
              <Link
                to={offer.buttonLink || "/shop"}
                data-aos="fade-up"
                data-aos-duration="3000"
                className="bg-secondary text-white  text-xs font-bold uppercase tracking-widest px-12 py-4 rounded-sm hover:bg-primary transition-all shadow-lg active:scale-95"
              >
                {offer.buttonText || "Shop Now"}
              </Link>
            </div>
          </div>
        </section>
      );
      })}
    </div>
  );
}
