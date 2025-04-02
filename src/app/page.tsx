'use client';

import Hero from '@/components/Hero';
import Container from '@/components/Container';
import Image from 'next/image';
import Button from '@/components/Button';
import SEO from '@/components/SEO';

export default function Home() {
  return (
    <>
      <SEO
          title="Home | Mountain Goat Garage Doors"
          description="Reliable garage door services in Buena Vista and the Arkansas River Valley."
          url="https://www.mountaingoatgaragedoors.com/"
        />

      <Hero />

      {/* Tray 2 – Visual Impact */}
      <section className=" py-5"
      style={{
        // backgroundColor: 'var(--color-panel)',
        // borderTop: '1px solid var(--color-border)',
        color: 'var(--color-text)',
    }}>
      <Container>
        <div className="section-tray"
        style={{
          background: 'linear-gradient(135deg, #3a3a3a, #1f1f1f)',
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          transition: 'transform 0.3s ease-in-out',
          padding: '2rem',
          borderRadius: '8px',
        }}>
          <div className="row g-4">
            {/* Large Image Block */}
            <div className="col-12 col-md-8 d-flex flex-column justify-content-between rounded p-4"
            style={{
                  transition: 'transform 0.3s ease-in-out', 
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-5px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <div className="position-relative h-100 rounded overflow-hidden" style={{ backgroundColor: '#222', height: '100%' }}>
                <Image
                  src="/stock/door9.jpg"
                  alt="Luxury garage"
                  className="w-100 h-100 object-fit-cover rounded"
                  style={{ 
                    objectFit: 'cover', 
                  }}
                  width={800}
                  height={600}
                />
                <div className="position-absolute bottom-0 start-0 p-4 bg-dark bg-opacity-75 w-100">
                  <h2 className="text-light fs-4 text-uppercase fw-light m-0">Open Up the Possibilities</h2>
                </div>
              </div>
            </div>

            {/* Side Text Feature Block */}
            <div
                className="col-12 col-md-4 d-flex flex-column justify-content-between rounded p-4"
                style={{
                  background: 'linear-gradient(135deg, #3a3a3a, #1f1f1f)', // Dark gradient for depth
                  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)', // Subtle shadow
                  border: '1px solid rgba(255, 255, 255, 0.1)', // Light border for definition
                  transition: 'transform 0.3s ease-in-out', // Hover transition effect
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-5px)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
              >          
              <div
                className="rounded overflow-hidden mb-3"
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '200px', 
                  backgroundColor: '#222', 
                }}
              >
                <Image
                  src="/stock/door11.jpg" // Update with your correct image path
                  alt="Bold by Design"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
                {/* Content */}
              <div>
                <h3 className="fs-5 text-uppercase text-light">Bold by Design</h3>
                <p className="small text-light">
                  Every door we install is a design decision. We blend form, silence, and strength into each entry point.
                </p>
              </div>

              <Button href="/contact" label="Book a Consult" variant="outline" className="mt-3 align-self-start" />
            </div>
          </div>
        </div>
      </Container>
    </section>


    <section
      className="py-5 border-top border-secondary"
      style={{
        backgroundColor: 'transparent',
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
      }}
      >
        <h3 className="text-uppercase text-center mb-5" style={{color: 'white'}}>Why Choose Us</h3>
        <div className="text-light row g-3 justify-content-center">
        {[
          {
            label: 'We value your time and money as much as you do.',
            color: '#222',
          },
          {
            label:
              'We are the locally owned and operated garage door business in Buena Vista.',
            color: '#333',
          },
        ].map((item, i) => (
          <div key={i} className="col-12 col-md-6">
            <div
              className="rounded p-4 h-100 text-center"
              style={{
                backgroundColor: item.color,
                transition: 'all 0.3s ease-in-out',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
              }}
              // Individual Hover Effect on Each Item
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-5px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <p className="fw-semibold small text-uppercase m-0">{item.label}</p>
            </div>
          </div>
        ))}
      </div>
        </div>
      </Container>
    </section>




      {/* Tray 4 – Testimonial */}
      {/* <section className=" py-5 border-top border-secondary"
      style={{
        backgroundColor: 'var(--color-panel)',
        borderTop: '1px solid var(--color-border)',
        color: 'var(--color-text)',
      }}> */}
      {/* <Container>
        <div className="row g-3"> */}
          {/* Quote */}
          {/* <div className="col-12 col-md-6">
            <div className="rounded p-4 h-100">
              <blockquote className="fst-italic text-muted">
                “Garage Underground completely transformed the look of my home. They delivered exactly what I wanted — clean lines, quiet openers, and serious style.”
              </blockquote>
              <p className="fw-semibold mt-3">— Alex R., Boulder</p>
            </div>
          </div> */}

          {/* Image */}
          {/* <div className="col-6 col-md-3 text-center">
            <div className="bg-secondary rounded-circle overflow-hidden mx-auto" style={{ width: '120px', height: '120px' }}>
              <img
                src="/client-placeholder.jpg"
                alt="Client photo"
                className="img-fluid h-100 w-100 object-fit-cover"
              />
            </div>
          </div> */}

          {/* CTA */}
          {/* <div className="col-6 col-md-3 d-flex align-items-center">
            <div className="bg-secondary rounded p-3 w-100 text-center">
              <h4 className="text-light fs-6 text-uppercase mb-2">Like what you see?</h4>
              <a href="/contact" className="text-light btn btn-outline-light btn-sm">
                Get a Quote
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section> */}

    </>
  );
}

