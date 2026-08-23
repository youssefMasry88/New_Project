import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addToCart } from "../utils/cart";

import toast from "react-hot-toast";
import { getProducts, getProductBySlug } from "../services/productService";
import CartDrawer from "../Components/UI/CartDrawer";
import { increaseQty, decreaseQty, removeItem, getCart } from "../utils/cart";
import { getMyWishlist ,toggleWishlist } from "../services/wishlistService";

export default function SinglePage() {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const { slug } = useParams();
  const [liked, setLiked] = useState(false);
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [mobileImage, setMobileImage] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  
// CHECK WISHLIST
useEffect(() => {
  const checkWishlist = async () => {
    if (!product?.id) return;

    try {
      const wishlist = await getMyWishlist();

      console.log("MY WISHLIST:", wishlist);

      const exists = wishlist.some(
        (item) => Number(item.id) === Number(product.id)
      );

      console.log("IS IN WISHLIST:", exists);

      setLiked(exists);
    } catch (error) {
      console.error("CHECK WISHLIST ERROR:", error);
    }
  };

  checkWishlist();
}, [product]);



useEffect(() => {
    const fetchProduct = async () => {
      try {
        const currentProduct = await getProductBySlug(slug);
        setProduct(currentProduct);

        const allProducts = await getProducts();
        setProducts(allProducts);
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
    <div className="pt-20">
      <div className="max-w-5xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10">
        {/* image */}

        <div
          className=" relative group overflow-hidden h-150 cursor-pointer rounded-2xl "
          onTouchStart={() => {
            if (product.hoverImage) {
              setMobileImage((prev) => !prev);
            }
          }}
        >
          <img
            src={product.image}
            alt={product.name}
            className={`w-full h-full object-cover transition duration-700 ${
              mobileImage ? "opacity-0" : "opacity-100"
            } group-hover:opacity-0 group-hover:scale-105`}
          />

          <img
            src={product.hoverImage}
            alt={product.name}
            className={`absolute inset-0 w-full h-full object-cover transition duration-700 ${
              mobileImage ? "opacity-100 scale-105" : "opacity-0"
            } group-hover:opacity-100 group-hover:scale-105`}
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
                    setCartItems(getCart());
                    setCartOpen(true);
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
  onClick={async () => {
    try {
      console.log("PRODUCT BEFORE TOGGLE:", product);
      console.log("PRODUCT ID:", product.id);
      console.log("PRODUCT DOCUMENT ID:", product.documentId);
      const status = await toggleWishlist(product);



      setLiked(status);

      if (status) {
        toast.success("Added to wishlist");
      } else {
        toast.success("Removed from wishlist");
      }
    } catch (error) {
      console.error("WISHLIST ERROR:", error);
      toast.error("Failed to update wishlist");
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

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onRemove={handleRemove}
        onIncrease={handleIncrease}
        onDecrease={handleDecrease}
      />
    </div>
  );
}
