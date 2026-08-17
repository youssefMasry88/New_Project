import React, { useEffect, useState } from "react";
import { FiInstagram } from "react-icons/fi";
import { getInstagramPosts } from "../../services/instagramService";

export default function InstagramGallery() {
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getInstagramPosts();
        setPosts(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchPosts();
  })
  return (
    <section className="py-24 px-6 md:px-10 lg:px-20">
      
      {/* Title */}
      <div className="text-center mb-12">
        <h2 className="font-secondary text-4xl text-primary mb-3">
          Follow Us On Instagram
        </h2>
        <p className="text-third">
          Follow us
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {posts.map((post) => (
          <div key={posts.id} className="relative group overflow-hidden rounded-2xl">
<img
  src={
    post.image?.url
    ? `http://localhost:1337${post.image?.url}`
    : ""
  }
  alt={post.altText || "Instagram"}
  loading="lazy"
  className="w-full h-55 object-cover transition duration-500 group-hover:scale-105"
/>

            {/* overlay */}
            <a href={post.link || "https://instagram.com"} 
            target="_blank"
            rel="noreferrer"
            className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition flex items-center justify-center">
              <FiInstagram className="text-white text-2xl opacity-0 group-hover:opacity-100 transition" />
            </a>
          </div>
        ))}
      </div>

      {/* Button */}
      <div className="text-center mt-10">
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 border border-primary text-primary px-6 py-3 rounded-full hover:bg-primary hover:text-white transition"
        >
          <FiInstagram />
          Follow on Instagram
        </a>
      </div>
    </section>
  );
}