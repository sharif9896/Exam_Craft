import { useState } from "react";
import {motion, AnimatePresence } from 'framer-motion';
import { useEffect } from "react";
import DashCon from "./DashCon";
import AevisLoader from "./AevisLoader";
export default function LoaderVerify() {
  const [loading, setLoading] = useState(true);

    const user = localStorage.getItem("user") || "Admin";
    
    const user1 = localStorage.getItem("user");
    
      useEffect(() => {
        if(!user1) return window.location.href = "/";
      }, [])

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative">
      <AnimatePresence mode="wait">
        {loading ? (
          <AevisLoader key="loader" />
        ) : (
          <motion.div key="content">
            <DashCon />
            {/* Other sections go here */}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}