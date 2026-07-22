'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function HeroBackground() {
  const [mounted, setMounted] = useState(false);
  
  // Motion values for mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for fluid, premium movement
  const springConfig = { damping: 40, stiffness: 100, mass: 1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Slower springs for background elements to create parallax
  const slowSpringConfig = { damping: 50, stiffness: 40, mass: 2 };
  const slowX = useSpring(mouseX, slowSpringConfig);
  const slowY = useSpring(mouseY, slowSpringConfig);

  // Derived inverted movement for the angled lines
  const reverseX = useTransform(smoothX, v => v * -0.5);
  const reverseY = useTransform(smoothY, v => v * -0.5);

  useEffect(() => {
    setMounted(true);
    
    // Start from center of the screen
    if (typeof window !== 'undefined') {
      mouseX.set(window.innerWidth / 2);
      mouseY.set(window.innerHeight / 2);
    }

    const handleMouseMove = (e) => {
      // Calculate normalized mouse position (-1 to 1)
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      
      mouseX.set(x * 100); // 100px movement range
      mouseY.set(y * 100);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div style={{
      position: 'absolute',
      top: 0, left: 0, right: 0, bottom: 0,
      overflow: 'hidden',
      zIndex: -1,
      pointerEvents: 'none',
      background: '#0a0a0a'
    }}>
      
      {/* 
        Grid background 
      */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        maskImage: 'radial-gradient(ellipse 60% 60% at 50% 30%, black 20%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 60% 60% at 50% 30%, black 20%, transparent 100%)'
      }} />

      {/* 
        Interactive Light Source 1 (The main spotlight that follows the mouse tightly)
      */}
      <motion.div
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          width: '600px',
          height: '600px',
          marginLeft: '-300px',
          marginTop: '-300px',
          background: 'radial-gradient(circle, rgba(198, 255, 52, 0.15) 0%, rgba(198, 255, 52, 0) 70%)',
          borderRadius: '50%',
          filter: 'blur(40px)',
          x: smoothX,
          y: smoothY
        }}
      />

      {/* 
        Interactive Light Source 2 (A slower, deeper emerald/cyan glow for contrast)
      */}
      <motion.div
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          width: '800px',
          height: '800px',
          marginLeft: '-400px',
          marginTop: '-400px',
          background: 'radial-gradient(circle, rgba(20, 150, 100, 0.1) 0%, rgba(20, 150, 100, 0) 60%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
          x: slowX,
          y: slowY
        }}
      />

      {/* 
        Abstract Angled Lines (Raycast style) 
      */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          x: reverseX,
          y: reverseY
        }}
      >
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '35%',
          width: '120px',
          height: '120vh',
          background: 'linear-gradient(180deg, rgba(198, 255, 52, 0) 0%, rgba(198, 255, 52, 0.08) 40%, rgba(198, 255, 52, 0) 100%)',
          transform: 'rotate(35deg)',
          filter: 'blur(20px)',
          mixBlendMode: 'screen'
        }} />
        
        <div style={{
          position: 'absolute',
          top: '-10%',
          left: '55%',
          width: '180px',
          height: '150vh',
          background: 'linear-gradient(180deg, rgba(198, 255, 52, 0) 0%, rgba(198, 255, 52, 0.12) 50%, rgba(198, 255, 52, 0) 100%)',
          transform: 'rotate(35deg)',
          filter: 'blur(30px)',
          mixBlendMode: 'screen'
        }} />
      </motion.div>
      
      {/* 
        Film Grain Overlay for that premium texture
      */}
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.04,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        pointerEvents: 'none',
        zIndex: 10
      }} />
    </div>
  );
}
