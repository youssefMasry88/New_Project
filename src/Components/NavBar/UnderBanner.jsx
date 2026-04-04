import React from "react";
import banner from "../../assets/banner2.png";
import { IoIosSend } from "react-icons/io";

export default function UnderBanner() {
  return (
    <section className="relative w-full my-20">
      {/* Background */}
      <div className="relative h-95 md:h-110 lg:h-120 w-full">
        <img
          src={banner}
          alt="Newsletter"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/35" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="max-w-7xl mx-auto w-full px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
            {/* Left */}
            <div className="max-w-xl">
              <h1 className="text-3xl md:text-6xl lg:text-7xl font-secondary italic font-bold text-primary md:my-[1.25em]">
                Subscribe to Our Newsletter
              </h1>
              <p className=" text-sm md:text-base font-third text-third/90">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
            </div>

            {/* Right */}
            <form
              onSubmit={(e) => e.preventDefault()}
              className="w-full md:flex md:justify-end md:mt-[12em]"
            >
              <div className="relative w-full max-w-md ">
                <input
                  type="email"
                  name="email"
                  placeholder="write Your Email Here......."
                  className="
                    w-full bg-transparent text-third placeholder:text-third/80
                    border-b-2 border-secondary/80
                    focus:border-primary outline-none
                    py-3 pr-12 pl-1
                    transition-all duration-300
                  "
                />

                <button
                  type="submit"
                  className="absolute right-1 top-1/2 -translate-y-1/2 text-primary hover:opacity-80 transition"
                  aria-label="Subscribe"
                >
                  <IoIosSend size={22} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}