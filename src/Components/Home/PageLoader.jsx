import React, { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import Loader from "./Loader";

export default function PageLoader() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const startLoading = () => {
      if (cancelled) return;

      setLoading(true);

      const startTime = Date.now();
      const MINIMUM_TIME = 4000; // Minimum time in milliseconds (4 seconds)

      const images = Array.from(document.images);

      const imagePromises = images.map((img) => {
        if (img.complete) {
          return Promise.resolve();
        }

        return new Promise((resolve) => {
          img.addEventListener("load", resolve, { once: true });
          img.addEventListener("error", resolve, { once: true });
        });
      });

      Promise.all(imagePromises).then(() => {
        if (cancelled) return;

        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, MINIMUM_TIME - elapsed);

        setTimeout(() => {
          if (!cancelled) {
            setLoading(false);
          }
        }, remaining);
      });
    };

    requestAnimationFrame(startLoading);

    return () => {
      cancelled = true;
    };
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      {loading && <Loader />}
    </AnimatePresence>
  );
}