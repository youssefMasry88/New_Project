import axios from "axios";

const API = "https://homey-strapi.onrender.com";

const authHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const mapProduct = (product) => ({
  id: product.id,
  documentId: product.documentId,
  slug: product.slug,
  name: product.title,
  price: product.price,
  stock: product.stock,

  image: product.coverImage?.url
    ? `${API}${product.coverImage.url}`
    : "",

  hoverImage: product.hover_image?.url
    ? `${API}${product.hover_image.url}`
    : "",

  category: product.category?.name,

  description:
    product.description?.[0]?.children?.[0]?.text || "",
});

// =========================
// GET MY WISHLIST
// =========================

export const getMyWishlist = async () => {
  const res = await axios.get(
    `${API}/api/wishlist/me`,
    authHeaders()
  );

  console.log("WISHLIST RESPONSE:", res.data);

  const products = res.data?.products || [];

  return products.map(mapProduct);
};

// =========================
// TOGGLE WISHLIST
// =========================

export const toggleWishlist = async (product) => {
  console.log("SENDING DOCUMENT ID:", product.documentId);

  const res = await axios.post(
    `${API}/api/wishlist/toggle`,
    {
      productId: product.documentId,
    },
    authHeaders()
  );

  console.log("WISHLIST TOGGLE RESPONSE:", res.data);

  return res.data.added;
};

// =========================
// CHECK IF PRODUCT IS IN WISHLIST
// =========================

export const isInWishlist = async (productId) => {
  const wishlist = await getMyWishlist();

  return wishlist.some(
    (item) => Number(item.id) === Number(productId)
  );
};