import axios from "axios";
import { API_URL, getMediaUrl } from "./api";

export const getProducts = async () => {
  const res = await axios.get(`${API_URL}/products?populate=*`);

  return res.data.data.map((item) => ({
    id: item.id,
    documentId: item.documentId, // ✅ مهم للـ Wishlist
    slug: item.slug,
    name: item.title,
    price: item.price,
    stock: item.stock,

    image: getMediaUrl(item.coverImage?.url),

    hoverImage: getMediaUrl(item.hover_image?.url),

    category: item.category?.name,

    tag: item.bestSeller
      ? "Best Sellers"
      : item.newArrival
      ? "New Arrivals"
      : item.featured
      ? "Featured Pieces"
      : "",

    description:
      item.description?.[0]?.children?.[0]?.text || "",

    createdAt: item.createdAt,
  }));
};

export const getProductBySlug = async (slug) => {
  const res = await axios.get(
    `${API_URL}/products?filters[slug][$eq]=${slug}&populate=*`
  );

  const item = res.data.data[0];

  if (!item) return null;

  return {
    id: item.id,
    documentId: item.documentId, // ✅ مهم جدًا
    slug: item.slug,
    name: item.title,
    price: item.price,
    stock: item.stock,

    image: getMediaUrl(item.coverImage?.url),

    hoverImage: getMediaUrl(item.hover_image?.url),

    category: item.category?.name,

    description:
      item.description?.[0]?.children?.[0]?.text || "",

    createdAt: item.createdAt,
  };
};
