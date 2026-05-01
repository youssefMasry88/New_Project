import React, { useState } from "react";
import products from "../data/products";
import {  useNavigate, useParams } from "react-router-dom";
import { addToCart} from "../utils/cart";
import AddToCartButton from "../Components/UI/AddToCartButton";
export default function SinglePage() {
    const navigate = useNavigate();
    const [liked, setLiked] = useState(false);
    //   const location = useLocation();
    //   const query = new URLSearchParams(location.search).get("q") || "";

  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
if (!product) {
  return <h1 className="text-center mt-20">Product not found</h1>;
}


const suggested = products
  .filter((p) => p.id !== product.id)
  .slice(0, 4);

    const handleAdd = (product) => {
  addToCart(product, 1);
};

  return (
<div>
        <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10">
      {/* image */}
      <div className="relative group overflow-hidden h-150 cursor-pointer rounded-2xl ">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
        />

        <img
          src={product.hoverImage}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover opacity-0 transition duration-500 group-hover:opacity-100"
        />
      </div>

      {/* info */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 pt-10">
          <h1 className="text-3xl font-bold font-nav text-primary">
            {product.name}
          </h1>

          <p className="text-secondary ">{product.category}</p>

          <p className="text-3xl font-bold font-secondary text-primary">
            EGP {product.price.toLocaleString()}
          </p>

          <p className="text-third leading-relaxed mt-2">
            {product.description}
          </p>
        </div>

        {/* quantity */}
        <div className="flex items-center gap-4 mt-4">
          <div className="border rounded-xl">
            <button
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              className="px-3  text-2xl font-bold text-primary border-r cursor-pointer"
            >
              -
            </button>

            <span className="font-bold text-2xl px-5 text-primary">
              {quantity}
            </span>

            <button
              onClick={() => setQuantity((prev) => Math.max(1, prev + 1))}
              className="px-3  text-2xl font-bold text-primary  border-l cursor-pointer "
            >
              +
            </button>
          </div>
        </div>
       <div className="flex items-center gap-4 mt-4">
         <button
          onClick={() => addToCart(product, quantity)}
          className="bg-primary text-white py-3 w-[90%] rounded-xl mt-4 hover:opacity-90 cursor-pointer"
        >
          Add to Cart
        </button>
        <button
         onClick={() => setLiked(!liked)}
         className="bg-primary/30 text-white py-3 w-[10%] rounded-xl mt-4 hover:opacity-90 cursor-pointer">
            {liked ? "❤️" : "🤍"}
         </button>
       </div>
      </div>

          {/* 🛍️ Suggested Products */}
    </div>
            <div>
              <h2 className="text-2xl text-primary mb-6 text-center font-semibold">
                You May Also Like
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {suggested.map((item) => (
                  <div
                    key={item.id}
                    className=" rounded-lg text-center overflow-hidden group relative cursor-pointer"
                    onClick={() => navigate(`/product/${item.id}`)}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-80 object-cover group-hover:scale-105 transition"
                    />
      
                    <div>
                      <h3 className="text-sm text-primary font-medium pt-5">
                        {item.name}
                      </h3>
      
                      
      
                      <span className="text-xs text-secondary">EGP {item.price.toLocaleString()}</span>
                    </div>
                    {/* add button */}
                    <button
                      onClick={(e) => {
  e.stopPropagation();
  handleAdd(item);
}}
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
