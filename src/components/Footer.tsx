'use client';

import { site } from '@/constants/site';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { useEffect, useState } from 'react';

export default function Footer() {
    const [year, setYear] = useState<number>();

    useEffect(() => {
        setYear(new Date().getFullYear());
    }, []);

    return (
        <footer
            style={{
                background: 'linear-gradient(135deg, #3a3a3a, #1f1f1f)', // Same as section trays
                borderTop: '1px solid rgba(255, 255, 255, 0.1)', // Light border for separation
                color: '#fff', // White text for contrast
                padding: '1.5rem 0',
            }}
        >
            <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
                
                {/* Left side: Copyright */}
                <p className="mb-0 small text-center text-md-start">
                    {year && `© ${year}`} {site.name}. All rights reserved.
                </p>

                {/* Right side: Social + Site by */}
                <div className="d-flex flex-column flex-sm-row align-items-center gap-3">
                    
                    {/* Social Icons */}
                    <div className="d-flex gap-3">
                        {site.social
                            .filter((item) => item.type !== 'custom') // Only FA icons
                            .map(({ href, label, icon, color }) => (
                                <a
                                    key={href}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-decoration-none"
                                    style={{
                                        fontSize: '1.25rem',
                                        color: color || '#fff', // Default to white
                                        opacity: 0.8,
                                        transition: 'opacity 0.2s ease',
                                    }}
                                    onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                                    onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.8')}
                                    aria-label={label}
                                >
                                    <FontAwesomeIcon icon={icon} />
                                </a>
                            ))}
                    </div>

                    {/* Site by Peak Services */}
                    <div className="d-flex align-items-center gap-2">
                        <span className="small opacity-75">Site by</span>
                        <a
                            href="https://peakservices.biz"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Peak Services"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                textDecoration: 'none',
                            }}
                        >
                            <Image
                                src="/peakservices.svg"
                                alt="Peak Services Logo"
                                width={24}
                                height={24}
                                style={{
                                    objectFit: 'contain',
                                    filter: 'invert(100%) sepia(0%) saturate(0%) hue-rotate(180deg) brightness(200%) contrast(100%)',
                                }}
                            />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}




