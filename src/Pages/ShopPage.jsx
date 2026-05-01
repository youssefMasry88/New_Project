import React, { useState } from "react";
import localProducts from "../data/products";
import { IconChevronRight } from "@tabler/icons-react";
import { AnimatePresence } from "framer-motion";
import { IconPlus } from "@tabler/icons-react";
import { motion as Motion } from "framer-motion";
import { IconChevronDown } from "@tabler/icons-react";
import SortDropdown from "../Components/UI/SortDropdown";
import AddToCartButton from "../Components/UI/AddToCartButton";
import { addToCart } from "../utils/cart";

import {  useNavigate } from "react-router-dom";
export default function ShopPage() {
  const navigate = useNavigate();

  const [filter, setFilter] = useState("All Products");
  const categories = [
    "All Products",
    "Best Sellers",
    "New Arrivals",
    "Featured Pieces",
    "Ceramic",
    "Wooden",
    "Glass",
    "Handmade",
    "Abstract Vases",
    "Classic Vases",
  ];
  const [sortType, setSortType] = useState("Default Sorting");

  const filtered =
    filter === "All Products"
      ? localProducts
      : localProducts.filter((p) => p.category === filter || p.tag === filter);
  const sortedProducts = [...filtered].sort((a, b) => {
    if (sortType === "Price: Low to High") {
      return a.price - b.price;
    }
    if (sortType === "Price: High to Low") {
      return b.price - a.price;
    }
    if (sortType === "Newest Arrivals") {
      return b.createdAt - a.createdAt;
    }
    return 0; // Default sorting (no change)
  });

const finalProducts = sortedProducts;
  return (
    <div>
      {/* Banner */}
      <div className="bg-primary/5 w-full h-[70vh] flex flex-col items-center justify-center">
        <h1 className="text-5xl md:text-7xl font-nav text-primary">Shop</h1>

        <p className="text-sm mt-4 w-[80%] md:w-[40%] text-center font-nav text-secondary">
          Carefully crafted pieces designed to elevate your everyday space.
        </p>
      </div>

      {/* Content */}

      <div className="max-w-7xl mx-auto px-5 py-12 flex flex-col md:flex-row gap-10">
        {/* SideBar */}
        <div className="w-full md:w-1/4 hidden lg:block">
          <h2 className="italic text-2xl font-secondary mb-4 text-primary pb-2 border-b-2 border-primary w-50 ">
            Browse Collection
          </h2>

          <ul className="space-y-3 text-sm">
            {categories.map((cat) => (
              <Motion.li
                key={cat}
                onClick={() => setFilter(cat)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ x: 10, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`text-lg cursor-pointer italic font-secondary transition-colors ${
                  filter === cat
                    ? "text-primary underline"
                    : "text-secondary hover:text-primary"
                }`}
              >
                {cat}
              </Motion.li>
            ))}
          </ul>
        </div>

        {/* products */}
        <div className=" mx-auto">
          <div className="lg:hidden mb-6">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full p-3 border rounded-xl border-secondary"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <SortDropdown onSortChange={setSortType} />
          <Motion.div className="grid grid-cols-1 sm:grid-cols-2  gap-8">
            <AnimatePresence>
              {finalProducts.map((product) => (
                <Motion.div
                  layout
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -40 }}
                  transition={{ duration: 0.5 }}
                  key={product.id}
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="cursor-pointer"
                >
                  <div className="relative p-2 overflow-hidden group rounded-2xl">
                    {/* Image Box */}
                    {/* Main Image */}
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-125 object-cover transition duration-700 group-hover:opacity-0 group-hover:scale-105 "
                    />
                    {/* Shadow */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-full h-4 bg-black/20 blur-md rounded-full"></div>
                    {/* Hover Image */}
                    <img
                      src={product.hoverImage}
                      alt={product.name}
                      className="absolute inset-0 w-full h-130 object-cover opacity-0 transition duration-700 group-hover:opacity-100 group-hover:scale-105"
                    />

                    {/* Add To Cart Button */}

                    <AddToCartButton product={product} onAdd={addToCart} />
                  </div>

                  {/* Info */}
                  <div className="mt-4 flex justify-between items-center">
                    <h3 className="text-sm font-nav text-primary">
                      {product.name}
                    </h3>

                    <p className="text-primary font-nav font-bold text-sm mt-1">
                      EGP {product.price.toLocaleString()}
                    </p>
                  </div>
                </Motion.div>
              ))}
            </AnimatePresence>
            {finalProducts.length === 0 && (
              <p className="text-center col-span-2 text-gray-400 mt-10">
                No products found
              </p>
            )}
          </Motion.div>
        </div>
      </div>
    </div>
  );
}
