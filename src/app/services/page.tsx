import Container from '@/components/Container';
import SEO from '@/components/SEO';
import ServiceCard from '@/components/ServiceCard';
import { site } from '@/constants/site';
import Image from 'next/image';

export default function ServicesPage() {
    const { title, items } = site.pages.services;

    return (
        <>
        <SEO
            title="Services | Mountain Goat Garage Doors"
            description="New Garage Installations. 24/7 Repair. Custom Door Manufacturing. Residential & Commercial Openers. Proudly serving Buena Vista."
            url="https://www.mountaingoatgaragedoors.com/services"
        />
        {/* Section 1: What We Offer */}
        <section
            className="py-5 border-top border-secondary"
            style={{
                backgroundColor: 'transparent',
                color: 'var(--color-text)',
            }}
        >
            <Container>
                <div
                    className="section-tray"
                    style={{
                        background: 'linear-gradient(135deg, #3a3a3a, #1f1f1f)',
                        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        transition: 'transform 0.3s ease-in-out',
                        padding: '2rem',
                        borderRadius: '8px',
                    }}
                >
                    <div className="row align-items-center mb-5">
                        {/* Left Column - Main Services */}
                        <div className="col-md-6 mb-4 mb-md-0">
                            <h2 className="display-6 text-uppercase fw-light text-white">
                                {title}
                            </h2>
                            <ul className="mt-4 list-unstyled fs-5 text-white">
                                {items.map((item, i) => (
                                    <li key={i} className="mb-2">✔️ {item}</li>
                                ))}
                            </ul>
                        </div>

                        {/* Right Column - Image Inside Placeholder */}
                        <div className="col-md-6 position-relative">
                            <div
                                className="bg-secondary w-100 rounded position-relative"
                                style={{
                                    height: '300px',
                                    borderRadius: '8px',
                                    overflow: 'hidden',
                                }}
                            >
                                <Image
                                    src="/stock/door6.jpg"
                                    alt="Garage Door Installation"
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>

        {/* Section 2: Built for Your Needs */}
        <section
        className="py-5 border-top border-secondary"
        style={{
        backgroundColor: 'transparent',
        color: 'var(--color-text)',
        }}
        >
        <Container>
        <div
            className="section-tray"
            style={{
            background: 'linear-gradient(135deg, #3a3a3a, #1f1f1f)',
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '2rem',
            borderRadius: '8px',
            }}
        >
            <h3 className="text-uppercase text-start mb-5 text-white">Built for Your Needs</h3>
            <div className="row g-4 text-white">
            {/* Service Cards */}
            {[
                {
                title: 'New Garage Installations',
                desc: 'Modern, quiet, and durable doors for new builds and upgrades.',
                },
                {
                title: 'Custom Design',
                desc: 'Architectural styles tailored to your property aesthetic.',
                },
                {
                title: '24/7 Repair',
                desc: 'Emergency and scheduled repairs done right.',
                },
                {
                title: 'Smart Openers',
                desc: 'App-controlled systems for hands-free automation.',
                },
                {
                title: 'Opener Diagnosis & Replacement',
                desc: 'We troubleshoot, diagnose, and replace faulty openers.',
                },
                {
                title: 'Custom Door Manufacturing',
                desc: 'The only company offering custom garage door designs in Buena Vista.',
                },
                {
                title: 'Residential & Commercial Openers',
                desc: 'We install and repair all openers for homes and businesses.',
                },
            ].map((item, i) => (
                <ServiceCard key={i} title={item.title} desc={item.desc} />
            ))}

            {/* Logo Card */}
            <ServiceCard
                title="Mountain Goat Logo"
                desc="Proudly serving Buena Vista."
                imageSrc="/svg/SVG-LOGO-GREY.svg"
                isLogo
            />

            {/* Contact Us Card */}
            <ServiceCard
                title="Need Expert Advice?"
                desc="Get in touch with us today for custom solutions and professional service."
                isContact
            />
            </div>
        </div>
        </Container>
        </section>

    </>
    );
}



