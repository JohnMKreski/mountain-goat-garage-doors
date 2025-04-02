"use client";

import Container from '@/components/Container';
import SEO from '@/components/SEO';
import { site } from '@/constants/site';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function AboutPage() {
    const { title, subtitle, body } = site.pages.about;
    const phrases = [
        'Precision Built',
        'Trusted Craftsmanship',
        'Crafted for Strength',
        'Built to Endure',
        ];
        
        const [currentIndex, setCurrentIndex] = useState(0);
        const currentPhrase = phrases[currentIndex];
        
        useEffect(() => {
            const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % phrases.length);
            }, 3000); // 3s per phrase
            return () => clearInterval(interval);
        }, [phrases.length]);

        // Optional: Fade-in effect for the image
        // const [imageVisible, setImageVisible] = useState(false);

        // useEffect(() => {
        //   // Delay to simulate fade-in after component mount
        //     const timer = setTimeout(() => setImageVisible(true), 200);
        //     return () => clearTimeout(timer);
        // }, []);

    return (
        <>
            <SEO
                title="About | Mountain Goat Garage Doors"
                description="We are proud to serve the Buena Vista and the Arkansas River Valley community with dedication and unmatched expertise."
                url="https://www.mountaingoatgaragedoors.com/about"
            />

            <section
            className="py-5 border-top border-secondary"
            style={{
                backgroundColor: 'transparent',
                borderTop: '1px solid var(--color-border)',
                color: 'var(--color-text)',
            }}
            >
            <Container>
            <div className='section-tray'
            style={{
                background: 'linear-gradient(135deg, #3a3a3a, #1f1f1f)', // Dark gradient for depth
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)', // Subtle shadow
                border: '1px solid rgba(255, 255, 255, 0.1)', // Light border for definition
                transition: 'transform 0.3s ease-in-out', // Hover transition effect
              }}>
                <div className="row g-4 text-white">
                {/* Left Column - Statement + Quote */}
                <div className="col-12 col-lg-6 d-flex flex-column gap-4">
                    <div>
                    <h2 className="fs-4 text-uppercase fw-semibold mb-2">{title}</h2>
                    <p className="lead text-white">{subtitle}</p>
                    <p>{body}</p>
                    </div>
                    <blockquote className="fst-italic text-white border-start ps-3 border-secondary">
                    “Security is not a product, but a process. We ensure both.”
                    </blockquote>
                </div>

                {/* Right Column – Animated Phrase Carousel */}
                <div className="col-12 col-lg-6">
                    <div
                    className="position-relative rounded d-flex align-items-center justify-content-center overflow-hidden"
                    style={{ height: '300px' }}
                    >
                    {/* Background Image */}
                    <Image
                        src="/stock/door3.jpg" 
                        alt="Carousel Background"
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center"
                        className="rounded"
                        priority
                    />
                    
                    {/* Optional Overlay for Darkening */}
                    <div
                        className="position-absolute w-100 h-100"
                        style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.4)', // Optional: Dark overlay for contrast
                        top: 0,
                        left: 0,
                        borderRadius: '8px',
                        }}
                    />
                    
                    {/* Animated Text */}
                    <AnimatePresence mode="wait">
                        <motion.p
                        key={currentPhrase}
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -30, opacity: 0 }}
                        transition={{ duration: 0.6, ease: 'easeInOut' }}
                        className="text-center fs-5 fw-medium text-white m-0 position-relative"
                        style={{
                            zIndex: 2, // Keeps text above image and overlay
                        }}
                        >
                        {currentPhrase}
                        </motion.p>
                    </AnimatePresence>
                    </div>
                </div>
                </div>
                </div>
            </Container>
            </section>

    
            {/* Locally Owned & Operated Section */}
            <section
            className="py-5 border-top border-secondary position-relative"
            style={{
                backgroundColor: 'transparent',
                color: 'var(--color-text)',
                overflow: 'hidden',
                height: '400px', // Set a defined height for better aspect control
            }}
            >
            <Container className="h-100 position-relative">
                {/* Text Content with Fade-in Effect */}
                <motion.div
                className="position-relative text-center d-flex flex-column justify-content-center h-100"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.3 }} // Text fade-in duration and delay
                style={{
                    zIndex: 2,
                    color: '#fff', // Ensuring white text
                }}
                >
                <h3 className="text-uppercase mb-3">Locally Owned & Operated</h3>
                <p
                    className="small mx-auto"
                    style={{
                    maxWidth: '600px',
                    position: 'relative',
                    zIndex: 3,
                    color: '#fff', // Ensuring white text for paragraph
                    }}
                >
                    We are proud to serve the Buena Vista and the Arkansas River Valley community with dedication and unmatched expertise.
                    As a locally owned business, we understand the unique needs of our neighbors and strive to provide reliable,
                    high-quality garage door solutions that stand the test of time.
                </p>
                </motion.div>

                {/* Background Image & Overlay Animation */}
                <motion.div
                className="position-absolute top-0 start-0 w-100 h-100"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, delay: 0.2 }} // Background and overlay fade-in
                style={{
                    zIndex: 1,
                    borderRadius: '0.75rem', // Rounded corners for the image
                    overflow: 'hidden',
                }}
                >
                {/* Background Image */}
                <Image
                    src="/stock/mnts.jpg" // Correct path to your image
                    alt="Buena Vista Community"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center 20%"
                    quality={90}
                    className="rounded"
                />
                
                {/* Dark Gradient Overlay */}
                <motion.div
                    className="position-absolute top-0 start-0 w-100 h-100"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }} // Optional: Dark overlay fades in
                    transition={{ duration: 1.2, delay: 0.3 }}
                    style={{
                    background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.3))',
                    borderRadius: '0.75rem',
                    zIndex: 1,
                    }}
                />
                </motion.div>
            </Container>
            </section>



        {/* Meet the Team */}
        {/* <section className="py-5 border-top border-secondary"
        style={{
            backgroundColor: 'var(--color-panel)',
            borderTop: '1px solid var(--color-border)',
            color: 'var(--color-text)',
        }}>
        <Container>
        <h3 className="text-uppercase text-center mb-4">Meet the Team</h3>
        <div className="row g-4">
            {[
            {
                name: 'Jordan Wells',
                role: 'Lead Installer',
                image: '/team1.jpg',
                quote: 'Precision is everything.',
            },
            {
                name: 'Maya Tran',
                role: 'Creative Director',
                image: '/team2.jpg',
                quote: 'Garage design is architecture.',
            },
            {
                name: 'Dylan Ortiz',
                role: 'Operations',
                image: '/team3.jpg',
                quote: 'Every job runs on timing.',
            },
            ].map((person, i) => (
            <div key={i} className="col-12 col-md-4">
                <div className="border border-secondary rounded p-3 text-center h-100 d-flex flex-column align-items-center">
                <div
                    className="rounded-circle overflow-hidden mb-3"
                    style={{
                    width: '100px',
                    height: '100px',
                    backgroundColor: '#444',
                    }}
                >
                    <img
                    src={person.image}
                    alt={person.name}
                    className="w-100 h-100 object-fit-cover"
                    />
                </div>
                <h4 className="fs-6 fw-semibold mb-1">{person.name}</h4>
                <p className="text-muted small mb-2">{person.role}</p>
                <blockquote className="fst-italic small text-muted">“{person.quote}”</blockquote>
                </div>
            </div>
            ))}
        </div>
        </Container>
        </section> */}

        </>
    );
}



