'use client';

import { useEffect, useRef, useState } from 'react';
import ReCAPTCHA from '@/components/Recaptcha';
import type { ReCAPTCHA as ReCAPTCHAClass } from 'react-google-recaptcha';

export default function ContactForm() {
    const [form, setForm] = useState({ name: '', email: '', message: '', phone: '', address: '', website: '' });
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [apiState, setApiState] = useState<'unknown' | 'enabled' | 'disabled' | 'unreachable'>('unknown');

    const recaptchaRef = useRef<ReCAPTCHAClass | null>(null);
    const formDisabled = process.env.NEXT_PUBLIC_CONTACT_FORM_DISABLED === 'true';
    const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

    const apiDisabled = apiState === 'disabled';
    const apiUnreachable = apiState === 'unreachable';
    const uiTemporarilyDisabled = formDisabled || apiDisabled || apiUnreachable || !recaptchaSiteKey;
    const inputsDisabled = loading || uiTemporarilyDisabled;

    const formStyle: React.CSSProperties = {
        border: '1px solid var(--color-border)',
        borderRadius: '0.5rem',
        padding: '1.5rem',
        color: 'white',
        opacity: inputsDisabled ? 0.65 : 1,
        filter: inputsDisabled ? 'grayscale(0.25)' : 'none',
        pointerEvents: inputsDisabled ? 'none' : 'auto',
        cursor: inputsDisabled ? 'not-allowed' : 'auto',
    };

    useEffect(() => {
        let isMounted = true;

        (async () => {
            try {
                const res = await fetch(`/api/contact?ts=${Date.now()}`, {
                    method: 'GET',
                    cache: 'no-store',
                });
                if (!res.ok) {
                    if (isMounted) setApiState('unreachable');
                    return;
                }
                const json = (await res.json()) as { disabled?: boolean };
                if (!isMounted) return;
                setApiState(json.disabled === true ? 'disabled' : 'enabled');
            } catch {
                if (isMounted) setApiState('unreachable');
            }
        })();

        return () => {
            isMounted = false;
        };
    }, []);

    const bannerMessage =
        formDisabled || apiDisabled
            ? 'The contact form is temporarily disabled due to unusually high traffic.'
            : apiUnreachable
                ? 'The contact form is temporarily unavailable right now.'
                : !recaptchaSiteKey
                    ? 'The contact form is temporarily unavailable (security configuration missing).'
                    : null;


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formDisabled || apiDisabled) {
            setStatus('error');
            setMessage('Contact form is temporarily disabled. Please call or email us.');
            return;
        }

        if (apiUnreachable) {
            setStatus('error');
            setMessage('Contact form is temporarily unavailable. Please call or email us.');
            return;
        }

        if (!recaptchaSiteKey) {
            setStatus('error');
            setMessage('Contact form is temporarily unavailable (reCAPTCHA not configured).Please call or email us.');
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
            const withTimeout = async <T,>(promise: Promise<T>, ms: number): Promise<T> => {
                return await Promise.race([
                    promise,
                    new Promise<T>((_, reject) =>
                        setTimeout(() => reject(new Error('Timed out')), ms)
                    ),
                ]);
            };

            const token = await withTimeout(recaptchaRef.current.executeAsync(), 8000);
            recaptchaRef.current.reset();

            if (!token) {
                throw new Error('Unable to verify reCAPTCHA');
            }
            
        const controller = new AbortController();
        const abortTimer = setTimeout(() => controller.abort(), 15000);

        const res = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...form, token }),
            signal: controller.signal,
        }).finally(() => clearTimeout(abortTimer));

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
        {bannerMessage ? (
            <div className="alert alert-warning" role="alert">
                <div className="fw-semibold">{bannerMessage}</div>
                <div className="small">
                    Please call <a className="link-dark" href="tel:+17193983077">+1 (719) 398 3077</a> or email{' '}
                    <a className="link-dark" href="mailto:info@mountaingoatgaragedoors.com">info@mountaingoatgaragedoors.com</a>.
                </div>
            </div>
        ) : null}
        <form onSubmit={handleSubmit} className="row g-4"
        style={formStyle}>

            {/* Name */}
            <div className="col-md-6">
            <label htmlFor="name" className="form-label small">Name</label>
            <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                required
                disabled={inputsDisabled}
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
                disabled={inputsDisabled}
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
                    disabled={inputsDisabled}
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
                    disabled={inputsDisabled}
                    value={form.address}
                    onChange={handleChange}
                />
            </div>

            {/* Honeypot (hidden field) */}
            <input
            type="text"
            name="website"
            autoComplete="off"
            disabled={inputsDisabled}
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
                disabled={inputsDisabled}
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
                disabled={inputsDisabled}
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


