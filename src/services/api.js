export const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV
    ? "http://localhost:1337"
    : "https://homey-strapi.onrender.com");

export const API_URL = `${API_BASE_URL}/api`;

export const getMediaUrl = (url) => {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${API_BASE_URL}${url}`;
};
