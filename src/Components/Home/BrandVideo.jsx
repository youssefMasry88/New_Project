import React, { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { getBrandVideo } from "../../services/brandVideoService";

export default function BrandVideo() {
  const [isOpen, setIsOpen] = useState(false);
  const [brandVideo, setBrandVideo] = useState(null);
  const API = "https://homey-strapi.onrender.com";

  useEffect(() => {
    const fetchBrandVideo = async () => {
      try {
        const data = await getBrandVideo();
        console.log(data);
        setBrandVideo(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBrandVideo();
  }, []);
  return (
    <section>
      <div
        className="relative group overflow-hidden shadow-2xl h-150 md:h-screen cursor-pointer "
        onClick={() => setIsOpen(true)}
      >
       {brandVideo?.backgroundImage?.url && (
  <img
    src={`https://homey-strapi.onrender.com${brandVideo.backgroundImage.url}`}
    alt="brand story"
    className="w-full h-full transition-transform object-cover duration-1000 group-hover:scale-105"
  />
)}
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-all duration-500 ">
          <div className="w-16 h-16 md:w-24 md:h-24 border-6 border-secondary rounded-full flex items-center justify-center text-white backdrop-blur-sm shadow-2xl">
            <div className="w-12 h-12 md:w-18 md:h-18 bg-white/20 rounded-full flex items-center justify-center pl-1">
              <FaPlay className="text-xl md:text-2xl animate-pulse" />
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-2 md:p-10 animate-fadeIn">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
            className="absolute top-4 right-4 md:top-10 md:right-10 text-white text-3xl md:text-5xl hover:text-primary transition-all"
          >
            <IoClose />
          </button>

          <div className="w-full max-w-6xl aspect-video shadow-2xl relative z-10 ">
            <div className="absolute inset-0 z-50 items-center justify-center flex cursor-pointer">
              {brandVideo?.video?.url && (
  <video
    onClick={(e) => e.stopPropagation()}
    src={`https://homey-strapi.onrender.com${brandVideo.video.url}`}
    controls
    autoPlay
    className="w-full h-full rounded-md shadow-inner object-contain"
  />
)}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
