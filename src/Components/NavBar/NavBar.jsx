import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { NavLinks } from "../../data/NavLinks";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { FiSearch } from "react-icons/fi";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

  const navLinkClass = ({ isActive }) =>`nav-link logo-text transition-colors hover:text-primary duration-300 ${
    isActive? "text-primary border-b border-primary " : "text-secondary"
  }`
  const navLinkClassMobile = ({ isActive }) => `text-xl font-medium transition-colors duration-300 ${
      isActive ? "text-primary border-b border-primary" : "text-secondary hover:text-primary transition-colors duration-300"
  }`
  return (
    <nav className="absolute top-0 left-0 w-full z-50 bg-transparent py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center relative">
          {/* Left links  */}
          <div className="hidden lg:flex space-x-12 xl:space-x-20 ">
            {NavLinks.filter((l) => l.side === "left").map((link, i) => (
              <NavLink key={i} to={link.path} className={navLinkClass}>
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Logo */}
          <div className="lg:absolute lg:left-1/2 lg:-translate-x-1/2">
            <Link
              to="/"
              className="text-5xl logo-text text-primary tracking-tighter"
            >
              Logo
            </Link>
          </div>

          {/* Right links*/}
          <div className="hidden lg:flex space-x-12 xl:space-x-20">
            {NavLinks.filter((l) => l.side === "right").map((link, i) =>
              link.name.toLowerCase() === "search" ? (
                <button
                  key={i}
                  onClick={() => setOpenSearch(!openSearch)}
                  className="nav-link logo-text text-secondary"
                >
                  {link.name}
                </button>
              ) : (
                <NavLink key={i} to={link.path} className={navLinkClass}>
                  {link.name}
                </NavLink>
              ),
            )}
          </div>

          {/* mobile Button */}
          <div className="lg:hidden ">
            <button
              onClick={() => setOpenSearch(!openSearch)}
              className="text-primary focus:outline-none p-2"
            >
              <FiSearch size={24} />
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-primary focus:outline-none p-2"
            >
              {isOpen ? <HiX size={30} /> : <HiMenuAlt3 size={30} />}
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div
        className={`absolute top-full left-0 w-full transition-all duration-300 overflow-hidden ${
          openSearch ? "max-h-40 py-6" : "max-h-0 opacity-0 py-0"
        }`}
      >
        <div className="max-w-3xl mx-auto px-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full border-b-2 border-secondary rounded-lg px-4 py-3 pr-12 outline-none focus:border-primary transition-colors duration-300 text-secondary focus:text-primary"
            />
            <FiSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-primary text-xl" />
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden absolute top-full w-full left-0 backdrop-blur-md shadow-lg transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-125 py-6" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col items-center gap-6">
          {NavLinks.map((link, i) =>
            link.name.toLowerCase() === "search" ? (
              <button
                key={i}
                onClick={() => {
                  setOpenSearch(!openSearch);
                  setIsOpen(false);
                }}
                className="text-xl font-medium text-secondary hover:text-primary transition-colors duration-300"
              >
                {link.name}
              </button>
            ) : (
              <NavLink
                key={i}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={navLinkClassMobile}
              >
                {link.name}
              </NavLink>
            ),
          )}
        </div>
      </div>
    </nav>
  );
}
