'use client';

import Container from '@/components/Container';
import { motion } from 'framer-motion';

export default function GalleryPage() {
    return (
        <section className="py-5 border-top border-secondary"
        style={{
            backgroundColor: 'var(--color-panel)',
            borderTop: '1px solid var(--color-border)',
            color: 'var(--color-text)',
        }}>
        <Container>
            <h2 className="display-6 text-uppercase text-center mb-5">Recent Work</h2>

            <div className="row g-4">
            {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="col-6 col-md-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <div className="position-relative overflow-hidden rounded" style={{ height: '240px' }}>
                    {/* Placeholder box (use <img> here later if needed) */}
                    <div
                        className="w-100 h-100"
                        style={{
                        backgroundColor: '#444',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#aaa',
                        fontSize: '0.85rem',
                        transition: 'transform 0.4s ease',
                        }}
                    >
                        Placeholder #{i + 1}
                    </div>

                    {/* Overlay title */}
                    <div className="position-absolute bottom-0 start-0 w-100 bg-dark bg-opacity-50 px-2 py-1 small text-white text-uppercase">
                        Project #{i + 1}
                    </div>

                    {/* Hover style */}
                    <style jsx>{`
                        div:hover > div:first-child {
                        transform: scale(1.04);
                        }
                    `}</style>
                    </div>
                </motion.div>
                </div>
            ))}
            </div>
        </Container>
        </section>
    );
}



