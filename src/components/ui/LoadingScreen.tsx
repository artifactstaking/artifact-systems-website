import React from 'react';
import { motion } from 'framer-motion';
import { LoadingIcon } from './LoadingIcon';

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 0.5,
          ease: "easeOut"
        }}
      >
        <LoadingIcon />
      </motion.div>
    </div>
  );
}