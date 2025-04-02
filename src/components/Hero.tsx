'use client';

import Button from './Button';
import Container from './Container';
import { motion } from 'framer-motion';

export default function Hero() {
    return (
        <section
            className="py-5 py-md-7 text-center border-bottom border-secondary"
            style={{
                backgroundColor: 'transparent', // Section background if needed
                color: 'white', // Text color
                overflow: 'hidden',
            }}
        >
            <Container>
                {/* Section-Tray with Background */}
                <div
                    className="section-tray position-relative overflow-hidden p-5 rounded shadow"
                    style={{
                        background: 'linear-gradient(135deg, #3a3a3a, #1f1f1f)',
                        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)', // Subtle shadow
                        border: '1px solid rgba(255, 255, 255, 0.1)', // Light border for definition
                        transition: 'transform 0.3s ease-in-out', // Hover transition effect
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-5px)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
                            
                
                >
                    {/* Hero Heading with Motion */}
                    <motion.h1
                        className="display-4 fw-light text-uppercase mb-3"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        style={{ color: 'white' }} // White text for contrast
                    >
                        Rise Above the Rest
                    </motion.h1>

                    {/* Subtext with Delay */}
                    <motion.p
                        className="lead mb-4 mx-auto"
                        style={{
                            maxWidth: '600px',
                            color: 'white',
                            textShadow: '0px 2px 8px rgba(0,0,0,0.7)', // Optional text shadow for contrast
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                    >
                        Custom installations. Clean design. Built for modern homes with a bold edge.
                    </motion.p>

                    {/* Button with Slight Delay */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 1 }}
                        className="d-flex justify-content-center gap-3 mt-4"
                    >
                        <Button
                            href="/contact"
                            label="Get a Quote"
                            variant="outline"
                            className="btn-lg"
                        />
                        <Button
                            href="tel:+1234567890"
                            label="Give Us a Call"
                            variant="outline"
                            className="btn-lg"
                        />
                    </motion.div>
                </div>
            </Container>
        </section>
    );
}





