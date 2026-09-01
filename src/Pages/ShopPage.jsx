import React, { useEffect, useState } from "react";
import { IconChevronRight } from "@tabler/icons-react";
import { AnimatePresence } from "framer-motion";
import { IconPlus } from "@tabler/icons-react";
import { motion as Motion } from "framer-motion";
import { IconChevronDown } from "@tabler/icons-react";
import SortDropdown from "../Components/UI/SortDropdown";
import AddToCartButton from "../Components/UI/AddToCartButton";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../services/productService";
import { FaArrowUp } from "react-icons/fa";
import { getCategories } from "../services/categoryService";
import {
  addToCart,
  getCart,
  increaseQty,
  decreaseQty,
  removeItem,
} from "../utils/cart";
import CartDrawer from "../Components/UI/CartDrawer";

export default function ShopPage() {
  const navigate = useNavigate();
  const [showBtn, setShowBtn] = useState(false);
  const [filter, setFilter] = useState("All Products");
  const [categories, setCategories] = useState([
    "All Products",
    "Best Sellers",
    "New Arrivals",
    "Featured Pieces",
  ]);
  const [sortType, setSortType] = useState("Default Sorting");
  const [products, setProducts] = useState([]);
  const [mobileHovered, setMobileHovered] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [CartOpen, setCartOpen] = useState(false);
  const handleScroll = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setShowBtn(window.scrollY > 300);
    });
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories([
          "All Products",
          "Best Sellers",
          "New Arrivals",
          "Featured Pieces",
          ...data.map((category) => category.name),
        ]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
  }, []);

  const filtered =
    filter === "All Products"
      ? products
      : products.filter((p) => p.category === filter || p.tag === filter);

  const sortedProducts = [...filtered].sort((a, b) => {
    if (sortType === "Price: Low to High") {
      return a.price - b.price;
    }
    if (sortType === "Price: High to Low") {
      return b.price - a.price;
    }
    if (sortType === "Newest Arrivals") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    return 0; // Default sorting (no change)
  });

  const finalProducts = sortedProducts;
  const handleAdd = (product) => {
    const added = addToCart(product);

    if (added) {
      setCartItems(getCart());
      setCartOpen(true);
      toast.success("Item added to cart!");
    } else {
      toast.error("No more stock available");
    }
  };

  useEffect(() => {
    const updateCart = () => {
      setCartItems(getCart());
    };
    updateCart();
    window.addEventListener("storage", updateCart);
    return () => {
      window.removeEventListener("storage", updateCart);
    };
  }, []);
  const handleIncrease = (id) => {
    increaseQty(id);
    setCartItems(getCart());
  };

  const handleDecrease = (id) => {
    decreaseQty(id);
    setCartItems(getCart());
  };

  const handleRemove = (id) => {
    removeItem(id);
    setCartItems(getCart());
  };
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
              name="category"
              size={1}
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full 
      bg-white/70
      backdrop-blur-md
      border border-secondary/30
      text-primary
      px-5 py-3
      pr-12
      rounded-2xl
      shadow-md
      outline-none
      transition-all duration-300
      hover:border-primary
      hover:shadow-xl
      focus:border-primary
      focus:ring-2 focus:ring-primary/20
      cursor-pointer
      font-nav"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat} className="text-primary bg-white">
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <SortDropdown onSortChange={setSortType} />

          <Motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <AnimatePresence>
              {finalProducts.map((product) => (
                <Motion.div
                  layout
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -40 }}
                  transition={{ duration: 0.5 }}
                  key={product.id}
                  onClick={() => navigate(`/product/${product.slug}`)}
                  className="cursor-pointer"
                >
                  <div
                    className="relative p-2 overflow-hidden group rounded-2xl"
                    onTouchStart={(e) => {
                      e.stopPropagation();
                      if (product.hoverImage) {
                        setMobileHovered((prev) =>
                          prev === product.id ? null : product.id,
                        );
                      }
                    }}
                  >
                    {/* Image Box */}

                    {/* Main Image */}
                    <img
                      src={product.image}
                      className={`w-full h-125 object-cover transition duration-700 ${
                        mobileHovered === product.id
                          ? " opacity-0"
                          : "opacity-100"
                      }`}
                    />

                    {/* Shadow */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-full h-4 bg-black/20 blur-md rounded-full"></div>
                    {/* Hover Image */}
                    <img
                      src={product.hoverImage}
                      className={`absolute inset-0 w-full h-130 object-cover opacity-0 transition duration-700 ${
                        mobileHovered === product.id
                          ? " opacity-100 scale-105"
                          : " opacity-0"
                      } 
                      group-hover:opacity-100 group-hover:scale-105
                      `}
                    />

                    {/* Add To Cart Button */}

                    <AddToCartButton product={product} onAdd={handleAdd} />
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
      <CartDrawer
        isOpen={CartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onRemove={handleRemove}
        onIncrease={handleIncrease}
        onDecrease={handleDecrease}
      />
    </div>
  );
}
