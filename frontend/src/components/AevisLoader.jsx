import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const AevisLoader = ({ onComplete }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        y: "-100%", 
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
      }}
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#0a0a0a] text-white"
    >
      <div className="relative flex flex-col items-center">
        {/* Animated Logo/Icon */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="mb-4"
        >
          <Loader2 size={48} className="text-blue-500" />
        </motion.div>

        {/* Brand Reveal */}
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-2xl font-bold tracking-widest uppercase"
          >
            DIYA <span className="text-blue-500">PRO SOFT</span>
          </motion.h1>
        </div>
        
        {/* Progress Bar */}
        <h3>Loading...</h3>
        <motion.div 
          className="mt-6 h-[2px] bg-blue-500 w-0"
          animate={{ width: "200px" }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
};

export default AevisLoader;