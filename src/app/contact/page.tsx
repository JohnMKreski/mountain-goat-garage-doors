'use client';

import Container from '@/components/Container';
import Image from 'next/image';
import ContactForm from '@/components/ContactForm';

export default function ContactPage() {
    return (
        <section
            className="py-5 border-top border-secondary"
            style={{
                backgroundColor: 'transparent',
                borderTop: '1px solid var(--color-border)',
                color: 'var(--color-text)',
            }}
        >
            <Container>
                {/* Main Parent Tray with Two Columns */}
                <div
                    className="section-tray"
                    style={{
                        background: 'linear-gradient(135deg, #3a3a3a, #1f1f1f)',
                        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        transition: 'transform 0.3s ease-in-out',
                        padding: '2rem',

                    }}
                >
                    <h2 className="display-6 text-uppercase text-center text-white mb-5">
                        Let’s Build Something Bold
                    </h2>

                    {/* Row for Side-by-Side Layout */}
                    <div className="row g-4">
                        {/* Left Tray - Contact Form */}
                        <div className="col-12 col-lg-6">
                            <div
                                className="rounded p-4 h-100"
                                style={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    borderRadius: '8px',
                                }}
                            >
                                <ContactForm />
                            </div>
                        </div>

                        {/* Right Tray - Info/Branding */}
                        <div className="col-12 col-lg-6">
                            <div
                                className="rounded p-4 h-100 position-relative overflow-hidden"
                                style={{
                                    backgroundColor: 'var(--color-panel)',
                                    zIndex: 0,
                                    borderRadius: '8px',
                                }}
                            >
                                {/* Watermark Background */}
                                <Image
                                    src="/icons/png/Icons-Transparent-03.png"
                                    alt="Watermark Logo"
                                    fill
                                    style={{
                                        objectFit: 'cover',
                                        objectPosition: 'center 45%',
                                        opacity: 0.03,
                                        filter: 'blur(1px)',
                                        zIndex: 0,
                                        pointerEvents: 'none',
                                    }}
                                />

                                {/* Foreground Content */}
                                <div className="position-relative text-center" style={{ zIndex: 1 }}>
                                    {/* Foreground Logo */}
                                    <div
                                        className="my-4 position-relative mx-auto"
                                        style={{
                                            width: '100%',
                                            maxWidth: '300px',
                                            height: '200px',
                                        }}
                                    >
                                        <Image
                                            src="/logo/png/Transparent-03.png"
                                            alt="Mountain Goat Logo"
                                            fill
                                            style={{
                                                objectFit: 'contain',
                                                opacity: 1,
                                                imageRendering: 'auto',
                                            }}
                                            priority
                                        />
                                    </div>

                                    {/* Headquarters */}
                                    <div className="mb-4">
                                        <h4 className="fs-6 text-uppercase mb-3 text-white">Headquarters</h4>
                                        <p className="small text-light mb-2">Buena Vista, CO</p>
                                        <p className="small text-light mb-4">info@mountaingoatgaragedoors.com</p>
                                    </div>

                                    {/* Let’s Connect */}
                                    <div>
                                        <h4 className="fs-6 text-uppercase mb-3 text-white">Let’s Connect</h4>
                                        <p className="small text-light">
                                            We’re here to help! Expect a response the same day or within 24 hours.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}




