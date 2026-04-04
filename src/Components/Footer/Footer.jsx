import { IconBrandX } from "@tabler/icons-react";
import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="w-full border-t border-primary/10 mt-10">
      <div className="flex flex-col lg:flex-row justify-between gap-10 py-10 px-6 md:px-10 lg:px-20">
        {/* Logo */}
        <div className="flex flex-col gap-2">
            <Link
              to="/"
              className="text-4xl md:text-5xl logo-text text-primary tracking-tighter "
            >
              Logo
            </Link>

          {/* Contact US */}
          <div className="flex flex-col gap-2 pt-5 text-secondary ">
            <div>
              <Link>email@yourcompany.com</Link>
            </div>
            <span>15Th Street Avenue, New York, USA</span>
            <span>011-554-8798-6556</span>

            {/* Social Icons */}

            <div className="flex gap-2 text-black mt-2">
              <SocialLink to="#" icon={<FaFacebookF size={20} />} />
              <SocialLink to="#" icon={<FaLinkedinIn size={20} />} />
              <SocialLink to="#" icon={<IconBrandX size={20} />} />
              <SocialLink to="#" icon={<FaInstagram size={20} />} />
            </div>
          </div>
        </div>

          {/* 2. Quick Links */}
          <div className="flex flex-col gap-2">
            <h1 className="text-xl md:text-[32px] font-bold text-primary">
              Quick Links
            </h1>
            <div className="flex flex-col gap-2  ">
              <Link to="/" className="font-nav  text-secondary hover:text-primary hover:translate-x-1 transition-transform duration-200">
                Contact
              </Link>
              <Link to="/account" className="font-nav  text-secondary hover:text-primary hover:translate-x-1 transition-transform duration-200">
                Account
              </Link>
              <Link to="/about" className="font-nav  text-secondary hover:text-primary hover:translate-x-1 transition-transform duration-200">
                About
              </Link>
              <Link to="/shop" className="font-nav  text-secondary hover:text-primary hover:translate-x-1 transition-transform duration-200">
                Shop
              </Link>
            </div>
          </div>

        <div className="pt-5 ">
          <div className="flex flex-col gap-2 ">
            <div className="max-w-sm">
              <p className="text-2xl md:text-3xl font-nav leading-tight ">
                Subscribe to get our updates and offers
              </p>
            <div className="relative mt-6 flex items-center">
              <input
                type="email"
                placeholder="Write Your email address here....."
                className="bg-transparent w-[90%] outline-none text-sm placeholder:text-primary/40 text-primary border-b border-primary/40 py-2  focus:border-primary transition-colors duration-300 "
              />
              <button className="absolute text-primary right-8 p-2 hover:scale-110 transition-transform">
                <IoIosSend size={22} />
              </button>
            </div>
            </div>
          </div>
        </div>
      </div>

        {/* Bottom Bar */}  
      <div className=" border-t border-primary/30 "></div>
      <div className="px-5">
        <span className="text-sm text-primary  ">
          © 2026 Copyright Logo. Made by{" "}
          <Link
            to="https://github.com/YoussefMasry"
            className="text-primary underline font-bold"
          >
            {" "}
            Youssef Masry
          </Link>{" "}
        </span>
      </div>
    </div>
  );
}
const SocialLink = ({ to, icon }) => (
  <Link
    to={to}
    className="border border-black/20 rounded-lg p-2 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
  >
    {icon}
  </Link>
);
