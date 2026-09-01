import React, { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import Loader from "./Loader";

export default function PageLoader() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      {loading && <Loader />}
    </AnimatePresence>
  );
}