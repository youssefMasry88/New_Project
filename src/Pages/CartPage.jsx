import React, { useEffect, useState } from "react";
import { getCart, increaseQty, decreaseQty, removeItem, clearCart } from "../utils/cart";
import { IconXboxX } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import { FaArrowUp } from "react-icons/fa";

export default function CartPage() {
  const [cart, setCart] = useState(getCart());
  const navigate = useNavigate();
  const [showBtn, setShowBtn] = useState(false);
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
  const refreshCart = () => {
    setCart(getCart());
  };
const handleClearCart = () => {
const confirm = window.confirm("Are you sure you want to clear the cart?");
  
  if (!confirm) return;

  clearCart();
  setCart([]);
};
const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toLocaleString();
const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  return (
    <div className="max-w-6xl mx-auto px-5 py-20 min-h-screen ">
      <h1 className="text-3xl my-10 font-semibold font-secondary text-primary">
        Your Cart
      </h1>

      {cart.length === 0 ? (
        <p className="text-primary text-center">Cart is empty</p>
      ) : (
        <>
          <div className="space-y-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-6 border-b border-third/50 pb-4"
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-30 h-30 object-cover rounded-lg"
                />
                {/* Info */}
                <div className="flex-1">
                  <h3 className="text-primary font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-500">EGP {item.price.toLocaleString()}</p>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-2">
                  {/* Decrease Qty */}

                  <button
                    onClick={() => {
                      decreaseQty(item.id);
                      refreshCart();
                      toast.success("Quantity updated");
                    }}
                    className="text-primary pb-1.5 text-4xl font-semibold hover:text-secondary transition-colors duration-300 "
                  >
                    -
                  </button>

                  {/* Quantity */}
                  <span className="text-secondary font-semibold text-2xl">
                    {item.quantity}
                  </span>

                  {/* Increase Qty */}

                  <button
                    onClick={() => {
                      if (item.quantity < item.stock) {
                        increaseQty(item.id);
                      refreshCart();
                      toast.success("Quantity updated");
                      }else {
                        toast.error("Cannot add more than available stock");
                      }
                    }}
                    className="shadow-primary pb-1 text-2xl font-semibold text-primary hover:text-secondary transition-colors duration-300 "
                  >
                    +
                  </button>
                </div>

                {/* Remove */}
                <button
                  onClick={() => {
                    removeItem(item.id);
                    refreshCart();
                    toast.success("Removed from cart");
                  }}
                >
                  <IconXboxX
                    stroke={2}
                    className="w-5 h-5 text-primary hover:text-secondary transition-colors duration-300"
                  />
                </button>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className=" flex flex-col md:flex-row md:justify-between items-center mt-10">
            <div>
            <h2 className="text-xl text-primary  font-secondary ">Total Items: <span className="font-bold">{totalItems}</span></h2>
              <h2 className="text-xl text-primary  font-secondary ">
              Total:{" "}
              <span className="font-bold">{totalPrice} EGP </span>
            </h2>
            </div>

              {/* Buttons */}
            <div className=" flex items-center gap-4 md:mt-0 mt-4">
            <button
              onClick={handleClearCart}
              className="px-6 py-3 bg-third hover:bg-primary text-white rounded-lg hover:opacity-90 transition"
            >
              Clear Cart
            </button>
            {/* Checkout Button */}
            <button
              onClick={() => navigate("/checkout")}
              className="px-6 py-3 bg-primary hover:bg-secondary text-white rounded-lg hover:opacity-90 transition"
            >
              Checkout
            </button>
            

            </div>
          </div>
        </>
      )}

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
    </div>
  );
}

