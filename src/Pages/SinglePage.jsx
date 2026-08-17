import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { addToCart } from "../utils/cart";
import { toggleWishlist } from "../utils/wishlist";
import toast from "react-hot-toast";
import {
  getProducts,
  getProductBySlug,
} from "../services/productService";
export default function SinglePage() {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const { slug } = useParams();
  const [liked, setLiked] = useState(false);
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // المنتج الحالي
        const res = await axios.get(
          `http://localhost:1337/api/products?filters[slug][$eq]=${slug}&populate=*`,
        );

        const item = res.data.data[0];

        if (!item) return;

const currentProduct = await getProductBySlug(slug);
setProduct(currentProduct);

const allProducts = await getProducts();
setProducts(allProducts);

  
        console.log(item);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [slug]);

  if (!product) {
    return <h1 className="text-center mt-20">Loading...</h1>;
  }

  let suggested = products.filter(
    (p) => p.id !== product.id && p.category === product.category,
  );

  if (suggested.length < 4) {
    const extraProducts = products.filter(
      (p) => p.id !== product.id && p.category !== product.category,
    );

    suggested = [...suggested, ...extraProducts];
  }

  suggested = suggested.slice(0, 4);

  return (
    <div className="pt-20">
      <div className="max-w-5xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10">
        {/* image */}
        <div className=" relative group overflow-hidden h-150 cursor-pointer rounded-2xl ">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition duration-700 group-hover:opacity-0 group-hover:scale-105"
          />

          <img
            src={product.hoverImage}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover opacity-0 transition duration-700 group-hover:opacity-100 group-hover:scale-105"
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
                onClick={() => {
                  if (product.stock === 0) {
                    toast.success("Out of stock");
                    return;
                  }
                  if (quantity < product.stock) {
                    setQuantity((prev) => prev + 1);
                  } else {
                    toast.error("Out of stock");
                  }
                }}
                className="px-3  text-2xl font-bold text-primary  border-l cursor-pointer "
              >
                +
              </button>
            </div>
          </div>
          <div>
            <p className="text-third leading-relaxed ">
              stock: {product.stock > 0 ? product.stock : "Out of stock"}
            </p>
          </div>
          <div>
            <p className="text-third leading-relaxed ">
              {product.stock > 0
                ? "In Stock"
                : "Currently unavailable. Please check back later."}
            </p>
          </div>
          <div className="flex items-center gap-4 ">
            <button
              onClick={() => {
                if (product.stock > 0) {
                  const added = addToCart(product, quantity);

                  if (added) {
                    toast.success("Item added to cart!");
                  } else {
                    toast.error("No more stock available");
                  }
                }
              }}
              className="bg-primary text-white py-3 w-[90%] rounded-xl mt-4 hover:opacity-90 cursor-pointer"
            >
              Add to Cart
            </button>

            <button
              onClick={() => {
                const status = toggleWishlist(product);

                setLiked(status);

                if (status) {
                  toast.success("Added to wishlist");
                } else {
                  toast.success("Removed from wishlist");
                }
              }}
              className="bg-primary/30 text-white py-3 w-[10%] rounded-xl mt-4 hover:opacity-90 cursor-pointer"
            >
              {liked ? "❤️" : "🤍"}
            </button>
          </div>
        </div>
      </div>
      {/* 🛍️ Suggested Products */}

      {suggested.length > 0 && (
        <div>
          <h2 className="text-2xl text-primary mb-6 text-center font-semibold">
            You May Also Like
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {suggested.map((item) => (
              <div
                key={item.id}
                className="rounded-lg text-center overflow-hidden group relative cursor-pointer"
                onClick={() => navigate(`/product/${item.slug}`)}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-80 object-cover group-hover:scale-105 transition"
                />

                <h3 className="text-sm text-primary font-medium pt-5">
                  {item.name}
                </h3>

                <span className="text-xs text-secondary">
                  EGP {item.price.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
