'use client';

import { useState } from 'react';
import Image from 'next/image';

type ServiceCardProps = {
  title: string;
  desc: string;
  imageSrc?: string; // Optional prop to include an image
  isLogo?: boolean;
  isContact?: boolean;
};

export default function ServiceCard({
  title,
  desc,
  imageSrc,
  isLogo = false,
  isContact = false,
}: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`col-12 col-md-6 col-lg-4`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`rounded p-4 h-100 border border-secondary text-center d-flex flex-column justify-content-center text-white`}
        style={{
          backgroundColor: 'var(--color-panel)',
          color: isContact ? 'white' : 'var(--color-text)',
          transition: 'transform 0.3s ease-in-out, box-shadow 0.3s',
          minHeight: '180px',
          transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
          boxShadow: isHovered
            ? '0 12px 24px rgba(0, 0, 0, 0.3)'
            : '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* Logo or Contact Section */}
        {isLogo ? (
          <>
            <Image
              src={imageSrc || '/svg/SVG-LOGO-GREY.svg'}
              alt="Mountain Goat Logo"
              width={100}
              height={100}
              className="mb-3 mx-auto"
              style={{
                objectFit: 'contain',
                scale: '1.8',
                imageRendering: 'auto',
                filter: 'brightness(0) invert(1)',
              }}
            />
            <p className="small mb-0 mt-1">{desc}</p>
          </>
        ) : isContact ? (
          <>
            <h4 className="fs-5 fw-semibold text-uppercase mb-3" style={{ color: 'white' }}>
              {title}
            </h4>
            <p className="small mb-3" style={{ color: 'white' }}>
              {desc}
            </p>
            <a href="/contact" className="btn btn-outline-light btn-sm text-white">
              Contact Us
            </a>
          </>
        ) : (
          <>
            <h4 className="fs-5 fw-semibold text-uppercase">{title}</h4>
            <p className="small mt-2">{desc}</p>
          </>
        )}
      </div>
    </div>
  );
}
