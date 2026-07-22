'use client';

import React from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';

export default function TiltCard({ children, style = {}, className = "" }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring rotations (limited to small degrees for elegant look)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 120, damping: 22 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 120, damping: 22 });

  // Glare positions mapped to coordinates
  const glareX = useSpring(useTransform(x, [-0.5, 0.5], [0, 100]), { stiffness: 120, damping: 22 });
  const glareY = useSpring(useTransform(y, [-0.5, 0.5], [0, 100]), { stiffness: 120, damping: 22 });

  // Motion template for radial glare background
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.05) 0%, transparent 60%)`;

  const handleMouseMove = (e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const valX = (e.clientX - rect.left) / width - 0.5;
    const valY = (e.clientY - rect.top) / height - 0.5;

    x.set(valX);
    y.set(valY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const defaultVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.94 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 75,
        damping: 18
      }
    }
  };

  return (
    <motion.div
      variants={defaultVariants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        ...style,
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        position: 'relative'
      }}
    >
      {/* Glare Sheen Layer */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          background: glareBackground,
          mixBlendMode: 'overlay',
          pointerEvents: 'none',
          zIndex: 5,
          borderRadius: 'inherit'
        }}
      />
      {/* Content wrapper with transform to pull it forward in 3D */}
      <div style={{ transform: 'translateZ(10px)', transformStyle: 'preserve-3d', width: '100%', height: '100%' }}>
        {children}
      </div>
    </motion.div>
  );
}
