import { motion } from "motion/react";
import { useLocation } from "react-router-dom";

// // Fade + Slide
// initial={{ opacity: 0, y: 10 }}
// animate={{ opacity: 1, y: 0 }}
// exit={{ opacity: 0, y: -10 }}

// // Slide horizontal
// initial={{ opacity: 0, x: 100 }}
// animate={{ opacity: 1, x: 0 }}
// exit={{ opacity: 0, x: -100 }}

// // Scale
// initial={{ opacity: 0, scale: 0.9 }}
// animate={{ opacity: 1, scale: 1 }}
// exit={{ opacity: 0, scale: 1.1 }}

// // Blur
// initial={{ opacity: 0, filter: "blur(10px)" }}
// animate={{ opacity: 1, filter: "blur(0px)" }}
// exit={{ opacity: 0, filter: "blur(10px)" }}

export function PageAnimation({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  
  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}
