'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import styles from './LanguageSelector.module.css';

const languages = [
  { code: 'es', label: 'Español', short: 'ES' },
  { code: 'en', label: 'English', short: 'EN' },
];

export default function LanguageSelector({ variant = 'dropdown', className = '' }) {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);

  const currentLang = languages.find((l) => l.code === language) || languages[0];

  const handleToggle = () => setIsOpen((prev) => !prev);

  const handleSelect = (code) => {
    setLanguage(code);
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  const handleKeyDown = useCallback(
    (e) => {
      if (!isOpen) {
        if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setIsOpen(true);
        }
        return;
      }

      if (e.key === 'Escape') {
        e.preventDefault();
        setIsOpen(false);
        triggerRef.current?.focus();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        const nextLang = language === 'es' ? 'en' : 'es';
        setLanguage(nextLang);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prevLang = language === 'en' ? 'es' : 'en';
        setLanguage(prevLang);
      }
    },
    [isOpen, language, setLanguage]
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  if (variant === 'segmented') {
    return (
      <div
        className={`${styles.segmentedControl} ${className}`.trim()}
        role="radiogroup"
        aria-label={t?.nav?.selectLanguage || 'Select language'}
      >
        {languages.map((item) => {
          const isActive = language === item.code;
          return (
            <button
              key={item.code}
              type="button"
              role="radio"
              aria-checked={isActive}
              className={`${styles.segmentedBtn} ${isActive ? styles.isActive : ''}`.trim()}
              onClick={() => setLanguage(item.code)}
            >
              <span className={styles.langCode}>{item.short}</span>
              <span className={styles.langLabel}>{item.label}</span>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div
      ref={dropdownRef}
      className={`${styles.wrapper} ${className}`.trim()}
      onKeyDown={handleKeyDown}
    >
      <button
        ref={triggerRef}
        type="button"
        className={`${styles.trigger} ${isOpen ? styles.isOpen : ''}`.trim()}
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={`${t?.nav?.selectLanguage || 'Select language'}: ${currentLang.label}`}
      >
        <Globe size={15} className={styles.globeIcon} aria-hidden="true" />
        <span className={styles.currentCode}>{currentLang.short}</span>
        <ChevronDown
          size={13}
          className={`${styles.chevronIcon} ${isOpen ? styles.rotate180 : ''}`.trim()}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <ul
          className={styles.dropdownMenu}
          role="listbox"
          aria-label={t?.nav?.selectLanguage || 'Select language'}
        >
          {languages.map((item) => {
            const isSelected = language === item.code;
            return (
              <li
                key={item.code}
                role="option"
                aria-selected={isSelected}
                className={`${styles.dropdownItem} ${isSelected ? styles.isSelected : ''}`.trim()}
                onClick={() => handleSelect(item.code)}
              >
                <div className={styles.itemContent}>
                  <span className={styles.itemBadge}>{item.short}</span>
                  <span className={styles.itemName}>{item.label}</span>
                </div>
                {isSelected && (
                  <Check size={14} className={styles.checkIcon} aria-hidden="true" />
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
