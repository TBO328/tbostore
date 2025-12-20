import React from 'react';
import { motion } from 'framer-motion';

interface FlyingCartItemProps {
  image: string;
  startPosition: { x: number; y: number };
  endPosition: { x: number; y: number };
}

const FlyingCartItem: React.FC<FlyingCartItemProps> = ({ image, startPosition, endPosition }) => {
  return (
    <motion.div
      className="fixed z-[100] pointer-events-none"
      initial={{
        x: startPosition.x,
        y: startPosition.y,
        scale: 1,
        opacity: 1,
      }}
      animate={{
        x: endPosition.x,
        y: endPosition.y,
        scale: 0.1,
        opacity: 0,
      }}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <img
        src={image}
        alt="Flying item"
        className="w-20 h-20 object-cover rounded-lg shadow-neon-cyan"
      />
    </motion.div>
  );
};

export default FlyingCartItem;
