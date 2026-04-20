import { motion } from "framer-motion";

export default function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
      <motion.div
        className="text-white text-3xl font-bold tracking-widest"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        AEVIS
      </motion.div>

      <motion.div
        className="absolute bottom-20 h-1 bg-white"
        initial={{ width: 0 }}
        animate={{ width: "200px" }}
        transition={{ duration: 2 }}
      />
    </div>
  );
}