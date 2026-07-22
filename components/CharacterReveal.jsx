'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function CharacterReveal({
  text,
  className = "",
  style = {},
  delay = 0,
  stagger = 0.02
}) {
  if (!text) return null;
  
  if (typeof text !== 'string') {
    return <span className={className} style={style}>{text}</span>;
  }

  const words = text.split(' ');

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay
      }
    }
  };

  const charVariants = {
    hidden: {
      opacity: 0,
      y: 28,
      rotateX: -65,
      scale: 0.88,
      filter: 'blur(10px)'
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        stiffness: 130,
        damping: 18,
        mass: 0.6
      }
    }
  };

  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={containerVariants}
      style={{
        display: 'inline-block',
        perspective: '1200px',
        ...style
      }}
    >
      {words.map((word, wordIdx) => (
        <span
          key={wordIdx}
          style={{
            display: 'inline-block',
            whiteSpace: 'nowrap',
            marginRight: wordIdx < words.length - 1 ? '0.28em' : 0,
            verticalAlign: 'baseline'
          }}
        >
          {word.split('').map((char, charIdx) => (
            <motion.span
              key={charIdx}
              variants={charVariants}
              className={className}
              style={{
                display: 'inline-block',
                transformOrigin: '50% 100%',
                transformStyle: 'preserve-3d',
                willChange: 'transform, opacity, filter'
              }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.span>
  );
}
