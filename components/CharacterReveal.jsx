'use client';

import React from 'react';
import { motion } from 'framer-motion';

const CharacterReveal = React.memo(function CharacterReveal({
  text,
  className = "",
  style = {},
  delay = 0,
  stagger = 0.015,
  mode = 'auto' // 'auto' | 'word' | 'char'
}) {
  if (!text) return null;
  
  if (typeof text !== 'string') {
    return <span className={className} style={style}>{text}</span>;
  }

  const isWordMode = mode === 'word' || (mode === 'auto' && text.length > 25);
  const words = React.useMemo(() => text.split(' '), [text]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: isWordMode ? Math.max(stagger, 0.02) : stagger,
        delayChildren: delay
      }
    }
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 16,
      rotateX: -30,
      scale: 0.96
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 140,
        damping: 20,
        mass: 0.5
      }
    }
  };

  return (
    <span style={{ position: 'relative', display: 'inline-block', ...style }}>
      <span style={{
        position: 'absolute',
        width: '1px',
        height: '1px',
        padding: 0,
        margin: '-1px',
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        whiteSpace: 'nowrap',
        border: 0
      }}>
        {text}
      </span>
      <motion.span
        aria-hidden="true"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-30px" }}
        variants={containerVariants}
        style={{
          display: 'inline-block',
          perspective: '1000px'
        }}
      >
        {isWordMode ? (
          words.map((word, wordIdx) => (
            <motion.span
              key={wordIdx}
              variants={itemVariants}
              className={className}
              style={{
                display: 'inline-block',
                whiteSpace: 'nowrap',
                marginRight: wordIdx < words.length - 1 ? '0.28em' : 0,
                transformOrigin: '50% 100%',
                willChange: 'transform, opacity'
              }}
            >
              {word}
            </motion.span>
          ))
        ) : (
          words.map((word, wordIdx) => (
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
                  variants={itemVariants}
                  className={className}
                  style={{
                    display: 'inline-block',
                    transformOrigin: '50% 100%',
                    willChange: 'transform, opacity'
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </span>
          ))
        )}
      </motion.span>
    </span>
  );
});

export default CharacterReveal;
