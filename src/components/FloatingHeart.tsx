import { motion } from 'framer-motion';
import React from 'react';

interface FloatingHeartProps {
  x: number;
  delay: number;
}

export const FloatingHeart: React.FC<FloatingHeartProps> = ({ x, delay }) => {
  return (
    <motion.div
      initial={{ y: -20, x, opacity: 0 }}
      animate={{
        y: ['100vh'],
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration: 10,
        delay,
        repeat: Infinity,
        ease: "linear"
      }}
      className="absolute text-2xl pointer-events-none"
    >
      ❤️
    </motion.div>
  );
};