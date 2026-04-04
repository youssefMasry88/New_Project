import React from "react";
import { FiInstagram } from "react-icons/fi";

import P1 from "../../assets/P1.jpg";
import P2 from "../../assets/P2.jpg";
import P3 from "../../assets/P3.jpg";
import P4 from "../../assets/P4.jpg";
import P5 from "../../assets/P5.jpg";
import P6 from "../../assets/P6.jpg";

export default function InstagramGallery() {
  const images = [P1, P2, P3, P4, P5, P6];

  return (
    <section className="py-24 px-6 md:px-10 lg:px-20">
      
      {/* Title */}
      <div className="text-center mb-12">
        <h2 className="font-secondary text-4xl text-primary mb-3">
          Follow Us On Instagram
        </h2>
        <p className="text-third">
          @yourbrand
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {images.map((img, index) => (
          <div key={index} className="relative group overflow-hidden">
<img
  src={img}
  alt="Instagram"
  loading="lazy"
  className="w-full h-55 object-cover transition duration-500 group-hover:scale-105"
/>

            {/* overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition flex items-center justify-center">
              <FiInstagram className="text-white text-2xl opacity-0 group-hover:opacity-100 transition" />
            </div>
          </div>
        ))}
      </div>

      {/* Button */}
      <div className="text-center mt-10">
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 border border-primary text-primary px-6 py-3 rounded-full hover:bg-primary hover:text-white transition"
        >
          <FiInstagram />
          Follow on Instagram
        </a>
      </div>
    </section>
  );
}