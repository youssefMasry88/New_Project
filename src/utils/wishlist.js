// src/utils/wishlist.js

export const getWishlist = () => {
  return JSON.parse(localStorage.getItem("wishlist")) || [];
};

export const saveWishlist = (wishlist) => {
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  window.dispatchEvent(new Event("wishlistUpdated"));
};

export const isInWishlist = (productId) => {
  const wishlist = getWishlist();
  return wishlist.some((item) => item.id === productId);
};

export const toggleWishlist = (product) => {
  const wishlist = getWishlist();

  const exists = wishlist.some((item) => item.id === product.id);

  if (exists) {
    const updatedWishlist = wishlist.filter((item) => item.id !== product.id);
    saveWishlist(updatedWishlist);
    return false;
  }

  saveWishlist([...wishlist, product]);
  return true;
};