'use client';

import { useRef, useState } from 'react';
import ReCAPTCHA from '@/components/Recaptcha';
import type { ReCAPTCHA as ReCAPTCHAClass } from 'react-google-recaptcha';

export default function ContactForm() {
    const [form, setForm] = useState({ name: '', email: '', message: '', phone: '', address: '', website: '' });
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const recaptchaRef = useRef<ReCAPTCHAClass | null>(null);
    const formDisabled = process.env.NEXT_PUBLIC_CONTACT_FORM_DISABLED === 'true';
    const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formDisabled) {
            setStatus('error');
            setMessage('Contact form is temporarily disabled. Please call or email us.');
            return;
        }

        if (!recaptchaSiteKey) {
            setStatus('error');
            setMessage('Contact form is temporarily unavailable (reCAPTCHA not configured). Please call or email us.');
            return;
        }
        

        if (!recaptchaRef.current) {
            setStatus('error');
            setMessage('reCAPTCHA not ready. Try again in a moment.');
            return;
        }

        setLoading(true);
        setStatus('idle');
        setMessage('');

        try {
            const token = await recaptchaRef.current.executeAsync();
            recaptchaRef.current.reset();
            

        const res = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...form, token }),
        });

        const result = await res.json();

        if (!res.ok) {
            // console.error('Response Status:', res.status);
            // console.error('Error Details:', result);
            throw new Error(result.error || 'Failed to send');
        }

        setStatus('success');
        setMessage('Message sent! We’ll be in touch soon.');
        setForm({ name: '', email: '', message: '', phone: '', address: '', website: '' });
        // setToken(null);
        } catch (err) {
        console.error(err);
        setStatus('error');
        setMessage('Oops! Something went wrong. Try again later.');
        } finally {
        setLoading(false);
        }
    };

    return (
        <>
        <form onSubmit={handleSubmit} className="row g-4"
        style={{ 
            border: '1px solid var(--color-border)',
            borderRadius: '0.5rem', padding: '1.5rem',
            color: 'white'
        }}>

            {/* Name */}
            <div className="col-md-6">
            <label htmlFor="name" className="form-label small">Name</label>
            <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
            />
            </div>

            {/* Email */}
            <div className="col-md-6">
            <label htmlFor="email" className="form-label small">Email</label>
            <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                title='Please Enter a Valid Email Address'
                required
                value={form.email}
                onChange={handleChange}
            />
            </div>

            {/* Phone */}
            <div className="col-md-6">
                <label htmlFor="phone" className="form-label small">Phone Number</label>
                <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    name="phone"
                    pattern="[0-9]{10}"
                    placeholder="e.g., 5551234567"
                    // title="(555) 123-4567"
                    required
                    value={form.phone}
                    onChange={handleChange}
                />
            </div>

            {/* Address */}
            <div className="col-md-6">
                <label htmlFor="address" className="form-label small">
                    Address <span className="fst-italic">(optional)</span>
                </label>
                <textarea
                    className="form-control"
                    id="address"
                    name="address"
                    rows={2}
                    value={form.address}
                    onChange={handleChange}
                />
            </div>

            {/* Honeypot (hidden field) */}
            <input
            type="text"
            name="website"
            autoComplete="off"
            style={{ display: 'none', position: 'absolute', left: '-9999px' }}
            tabIndex={-1}
            />

            {/* Message */}
            <div className="col-12">
            <label htmlFor="message" className="form-label small">Message</label>
            <textarea
                className="form-control"
                id="message"
                name="message"
                rows={4}
                required
                value={form.message}
                onChange={handleChange}
            />
            </div>

            {/* Alert */}
            {status !== 'idle' && (
                <div
                className={`alert alert-${status === 'success' ? 'success' : 'danger'} alert-dismissible fade show`}
                role="alert"
                >
                {message}
                <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={() => setStatus('idle')}
                ></button>
                </div>
            )}

            {/* Submit */}
            <div className="col-12 text-end">
            <button
                type="submit"
                className={`btn inline-block px-6 py-3 text-sm font-medium uppercase tracking-wide transition ${
                    loading
                    ? 'bg-neutral-300 text-white' // Optional loading style
                    : 'btn-outline-light border border-white text-white hover:bg-white hover:text-black'
                }`}
                disabled={loading || formDisabled || !recaptchaSiteKey}
                >
                {loading ? (
                    <>
                    <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                    />
                    Sending...
                    </>
                ) : (
                    'Send Message'
                )}
                </button>
            </div>

            {/* Invisible reCAPTCHA (hidden but fixed) */}
            <div
                style={{
                    position: 'fixed', // Change to fixed to ensure it doesn't interfere with layout
                    width: 0,
                    height: 0,
                    overflow: 'hidden',
                    zIndex: -1, // Push behind everything
                }}
            >
                {recaptchaSiteKey ? (
                    <ReCAPTCHA
                        sitekey={recaptchaSiteKey}
                        size="invisible"
                        theme="dark"
                        badge="inline"
                        ref={recaptchaRef}
                    />
                ) : null}
            </div>

        </form>
        </>
    );
}


