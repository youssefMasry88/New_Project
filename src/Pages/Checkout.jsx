import React, { useState } from "react";
import { addToCart, clearCart, getCart } from "../utils/cart";
import products from "../data/products";
import AddToCartButton from "../Components/UI/AddToCartButton";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const [cart, setCart] = useState(getCart());
  const navigate = useNavigate();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // input Name
  const [form, setForm] = useState({
    name: "",
    email: "",
    zip: "",
    address: "",
    phone: "",
  });

  // input handle
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // successfully order
  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Order placed successfully 🎉");

    clearCart();
    setCart([]);

    setForm({
      name: "",
      email: "",
      zip: "",
      address: "",
      phone: "",
    });
    navigate("/success");
  };

  const suggested = products.slice(0, 4);

  const handleAdd = (product) => {
    setCart(getCart());
    addToCart(product);
  };
  return (
    <div className="max-w-6xl mx-auto space-y-16 py-30 px-5 min-h-screen ">
      {/* section */}
      <div className="grid md:grid-cols-2 gap-10">
        {/* section */}
        <div className="bg-primary/5 p-6 rounded-lg ">
          <h1 className="text-3xl mb-6 text-primary font-secondary font-semibold">
            Order Summary
          </h1>

          <div className="space-y-4  border-b pb-4 border-third/50">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span>
                  {item.name} x{item.quantity}
                </span>
                <span>EGP {(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>

          <h1 className="mt-3 text-3xl font-secondary text-primary font-bold ">Total: EGP {total.toLocaleString()}</h1>
        </div>

        {/* 🧍‍♂️ Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-2xl mb-6 text-primary font-semibold">
            Your Info
          </h2>

          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="w-full bg-transparent border-b-2 border-third focus:border-primary focus:transform duration-300 focus:shadow-2xl outline-none py-2 text-[#2B1D12] placeholder:text-third placeholder:text-sm pb-1"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full bg-transparent border-b-2 border-third focus:border-primary focus:transform duration-300 focus:shadow-2xl outline-none py-2 text-[#2B1D12] placeholder:text-third placeholder:text-sm pb-1"
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full bg-transparent border-b-2 border-third focus:border-primary focus:transform duration-300 focus:shadow-2xl outline-none py-2 text-[#2B1D12] placeholder:text-third placeholder:text-sm pb-1"
            required
          />
          
          <input type="text"
            name="zip"
            placeholder="zip"
            value={form.zip}
            onChange={handleChange}
            className="w-full bg-transparent border-b-2 border-third focus:border-primary focus:transform duration-300 focus:shadow-2xl outline-none py-2 text-[#2B1D12] placeholder:text-third placeholder:text-sm pb-1"
            required
          />

          <textarea
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            className="w-full bg-transparent border-b-2 border-third focus:border-primary transition-all duration-300 outline-none py-2 text-[#2B1D12] placeholder:text-third placeholder:text-sm resize-none"
            required
          />

          <button
            type="submit"
            className="w-full py-3 bg-primary text-white rounded-lg hover:opacity-90 transition"
          >
            Confirm Order
          </button>
        </form>
      </div>

      {/* 🛍️ Suggested Products */}
      <div>
        <h2 className="text-2xl text-primary mb-6 text-center font-semibold">
          You May Also Like
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {suggested.map((item) => (
            <div
              key={item.id}
              className=" rounded-lg text-center overflow-hidden group relative"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-65 object-cover group-hover:scale-105 transition"
              />

              <div>
                <h3 className="text-sm text-primary font-medium pt-5">
                  {item.name}
                </h3>

                

                <span className="text-xs text-secondary">EGP {item.price.toLocaleString()}</span>
              </div>
              {/* add button */}
              <button
                onClick={() => handleAdd(item)}
                className="absolute bottom-20 right-2 "
              >
                <AddToCartButton product={item} onAdd={handleAdd} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
