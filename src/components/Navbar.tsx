'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { site } from '@/constants/site';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
<nav
  style={{
    position: 'relative', // ✅ Add this to contain the background image
    backgroundColor: '#1f1f1f',
    borderBottom: '2px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden', // ✅ Prevents bleed
  }}
  className="sticky-top"
>
  <div
    className="container d-flex justify-content-between align-items-center py-3"
    style={{
      // backgroundColor: 'var(--color-bg-secondary)', // Corrected variable
      borderBottom: '0px solid var(--color-border)',
    }}
  >
    {/* Background Image */}
    <Image
      src="/icons/png/Icons-Transparent-01.png"
      alt={site.name}
      fill
      style={{
        objectFit: 'cover',
        objectPosition: 'center 68%',
        position: 'absolute',
        top: 0,
        left: 0,
        opacity: 0.3,
        zIndex: 0,
        pointerEvents: 'none',
        filter: 'blur(2px)',
        transform: 'scale(1.7)', // Corrected property
      }}
      priority
    />
    
    {/* Logo and Wordmark */}
    <div
      className="d-flex align-items-center"
      style={{ zIndex: 3, position: 'relative' }}
    >
      <Link href="/" className="d-flex align-items-center text-decoration-none">
        {/* Round Logo */}
        <span
          className="logo-container position-relative me-3"
          style={{
            width: '70px',
            height: '70px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-border)',
            overflow: 'hidden',
            flexShrink: 0,
          }}
        >
          <Image
            src="/icons/jpg/Icons-Highres-03.jpg"
            alt={site.name}
            fill
            style={{
              objectFit: 'cover',
              transform: 'scale(1.3) translateY(-5%)',
            }}
            priority
          />
        </span>

        {/* Wordmark */}
        <div
          style={{
            width: '200px',
            height: '50px',
            position: 'relative',
            flexShrink: 0,
          }}
        >
          <Image
            src="/svg/SVG-NAME.svg"
            alt="Mountain Goat Wordmark"
            fill
            style={{
              objectFit: 'contain',
              transform: 'scale(1)',
              filter: 'brightness(0) invert(1)', 
            }}
            priority
          />
        </div>
      </Link>
    </div>



        {/* Desktop Links */}
        <ul
          className="d-none d-md-flex list-unstyled mb-0 ms-auto gap-4"
          style={{
            zIndex: 3,
            position: 'relative',
          }}
        >
          {site.nav.map((link) => {
            const isActive = pathname === link.href;

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-decoration-none small text-white"
                  style={{
                    color: isActive ? 'white' : 'white',
                    fontWeight: isActive ? 600 : 500,
                    fontSize: isActive ? '0.95rem' : '0.85rem',
                    opacity: isActive ? 1 : 0.8,
                    transition: 'color 0.2s ease, font-size 0.2s ease',
                  }}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>


        {/* Mobile Toggle */}
        <button
          className="navbar-toggler d-md-none border-0 p-2 text-white"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
          style={{
            fontSize: '1.25rem',
            background: 'none',
            color: 'var(--color-text)',
          }}
        >
          {isOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Animated Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            style={{
              backgroundColor: 'var(--bg-secondary)',
              // borderTop: '1px solid var(--color-border)',
              overflow: 'hidden',
              position: 'relative',
              zIndex: 3
            }}
            className="d-md-none"
          >
            <ul className="navbar-nav flex-column p-3">
              {site.nav.map((link) => (
                <li key={link.href} className="nav-item mb-2">
                  <Link
                    href={link.href}
                    className="nav-link"
                    style={{
                      color: 'white',
                      fontWeight: pathname === link.href ? 600 : 500,
                    }}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}

              {/* Call Us - Mobile Only */}
              <li className="nav-item mb-2">
                <a
                  href="tel:+17193983077"
                  className="nav-link text-white "
                  style={{ 
                    fontWeight: 500
                  }}
                  onClick={() => setIsOpen(false)}
                >
                Call Us!
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}






