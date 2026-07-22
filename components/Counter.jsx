'use client';

import React, { useEffect, useRef, useState } from 'react';
import { animate } from 'framer-motion';

export default function Counter({ value, className = "", style = {} }) {
  const [mounted, setMounted] = useState(false);
  const ref = useRef(null);
  
  // Parse prefix, suffix, and numeric values
  const numberMatch = value ? value.match(/-?\d+(?:\.\d+)?/) : null;
  const numberPart = numberMatch ? numberMatch[0] : "";
  const prefix = numberMatch ? value.substring(0, value.indexOf(numberPart)) : "";
  const suffix = numberMatch ? value.substring(value.indexOf(numberPart) + numberPart.length) : (value || "");
  const targetNumber = parseFloat(numberPart) || 0;

  // Initial display value (e.g. "0x", "0%", "0M+")
  const initialFormatted = numberPart.includes('.') ? (0).toFixed(1) : "0";
  const [displayValue, setDisplayValue] = useState(`${prefix}${initialFormatted}${suffix}`);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const el = ref.current;
    if (!el) return;

    let hasAnimated = false;

    const startCounting = () => {
      if (hasAnimated) return;
      hasAnimated = true;

      animate(0, targetNumber, {
        type: 'spring',
        stiffness: 35,
        damping: 14,
        mass: 1,
        onUpdate: (latest) => {
          const formatted = numberPart.includes('.') 
            ? latest.toFixed(1) 
            : Math.round(latest).toString();
          setDisplayValue(`${prefix}${formatted}${suffix}`);
        }
      });
    };

    // 1. Primary: Native IntersectionObserver
    let observer = null;
    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries[0] && entries[0].isIntersecting) {
            startCounting();
            if (observer) observer.disconnect();
          }
        },
        { threshold: 0.05, rootMargin: '50px' }
      );
      observer.observe(el);
    } else {
      startCounting();
    }

    // 2. Fail-safe Fallback: If observer fails to fire within 600ms, start anyway
    const fallbackTimer = setTimeout(() => {
      startCounting();
    }, 600);

    return () => {
      if (observer) observer.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, [mounted, targetNumber, prefix, suffix, numberPart]);

  // Fallback for SSR
  if (!mounted) {
    return <span className={className} style={style}>{value}</span>;
  }

  return (
    <span
      ref={ref}
      className={className}
      style={{
        display: 'inline-block',
        fontVariantNumeric: 'tabular-nums',
        willChange: 'contents',
        ...style
      }}
    >
      {displayValue}
    </span>
  );
}
