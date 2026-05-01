import React, { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import Router from "./routes/Router";
import Loader from "./Components/Home/Loader";
import { AnimatePresence, motion as Motion } from "framer-motion";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <Loader key="loader" />
      ) : (
        <Motion.div
          key="main-content"
          initial={{ y: "100vh", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.43, 0.13, 0.23, 0.96],
          }}
        >
          <RouterProvider router={Router} />
        </Motion.div>
      )}
    </AnimatePresence>
  );
}