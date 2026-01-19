// /src/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/rateLimiter';

type ContactRequestBody = {
    name?: unknown;
    email?: unknown;
    message?: unknown;
    phone?: unknown;
    address?: unknown;
    website?: unknown; // honeypot
    token?: unknown; // reCAPTCHA
};


//API test endpoint
export async function GET() {
    return NextResponse.json({ status: 'Contact API is up' });
}

export async function POST(req: NextRequest) {
    try {
        if (process.env.CONTACT_FORM_DISABLED === 'true') {
            return NextResponse.json(
                { error: 'Contact form is temporarily disabled. Please call or email us.' },
                { status: 503 }
            );
        }

        const contentType = req.headers.get('content-type') || '';
        if (!contentType.includes('application/json')) {
            return NextResponse.json({ error: 'Invalid content type' }, { status: 415 });
        }

        const contentLengthHeader = req.headers.get('content-length');
        const contentLength = contentLengthHeader ? Number.parseInt(contentLengthHeader, 10) : undefined;
        if (Number.isFinite(contentLength) && (contentLength as number) > 20_000) {
            return NextResponse.json({ error: 'Payload too large' }, { status: 413 });
        }

        const rawForwardedFor = req.headers.get('x-forwarded-for');
        const ip =
            rawForwardedFor?.split(',')[0]?.trim() ||
            req.headers.get('x-real-ip') ||
            'unknown';

        const body = (await req.json()) as ContactRequestBody;

        // Honeypot: if filled, silently accept but do nothing.
        const website = typeof body.website === 'string' ? body.website.trim() : '';
        if (website.length > 0) {
            return NextResponse.json({ success: true }, { status: 200 });
        }

        // Basic per-IP throttling (best-effort in-memory).
        if (ip !== 'unknown' && !checkRateLimit(ip)) {
            return NextResponse.json(
                { error: 'Too many submissions. Please wait and try again later.' },
                { status: 429 }
            );
        }

        const name = typeof body.name === 'string' ? body.name.trim() : '';
        const email = typeof body.email === 'string' ? body.email.trim() : '';
        const message = typeof body.message === 'string' ? body.message.trim() : '';
        const phone = typeof body.phone === 'string' ? body.phone.trim() : '';
        const address = typeof body.address === 'string' ? body.address.trim() : undefined;

        if (name.length < 2 || name.length > 100) {
            return NextResponse.json({ error: 'Invalid name' }, { status: 400 });
        }

        if (email.length < 5 || email.length > 254 || !email.includes('@')) {
            return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
        }

        const normalizedPhone = phone.replace(/\D/g, '');
        if (normalizedPhone.length < 10 || normalizedPhone.length > 20) {
            return NextResponse.json({ error: 'Invalid phone' }, { status: 400 });
        }

        if (message.length < 10 || message.length > 5000) {
            return NextResponse.json({ error: 'Invalid message' }, { status: 400 });
        }

        // Optional reCAPTCHA: enforced automatically when secret exists.
        if (process.env.RECAPTCHA_SECRET_KEY) {
            const token = typeof body.token === 'string' ? body.token : '';
            if (!token) {
                return NextResponse.json({ error: 'Missing reCAPTCHA token' }, { status: 400 });
            }

            const verifyBody = new URLSearchParams({
                secret: process.env.RECAPTCHA_SECRET_KEY,
                response: token,
                remoteip: ip !== 'unknown' ? ip : '',
            });

            const verifyRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: verifyBody.toString(),
            });

            const verifyJson = (await verifyRes.json()) as { success?: boolean };
            if (!verifyJson?.success) {
                return NextResponse.json({ error: 'reCAPTCHA failed' }, { status: 400 });
            }
        }

        // 🔄 Lazy import only when needed
        const { sendContactEmail } = await import('@/lib/mailer');
        await sendContactEmail({
            name,
            email,
            message,
            phone: normalizedPhone,
            address,
        });

        return NextResponse.json({ success: true }, { status: 200 });
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error('Error in POST /api/contact:', error);
                return NextResponse.json(
                    {
                        error: 'Server error',
                        details: error.message,
                    },
                    { status: 500 }
                );
            } else {
                console.error('Unknown error in POST /api/contact:', error);
                return NextResponse.json(
                    {
                        error: 'Server error',
                        details: 'An unknown error occurred',
                    },
                    { status: 500 }
                );
            }
        }
    }

// export async function POST(req: NextRequest) {
//     try {
//         const { name, email, message, phone, address, website  } = await req.json();
//         const ip = req.headers.get('x-forwarded-for') || 'unknown';
//         const phonePattern = /^\d{10}$/;   // 10-digit US format
//         // const addressPattern = /^[a-zA-Z0-9\s,.'-]{3,}$/; // Basic address validation

//         // console.log('Received Form Data:', { name, email, phone, address, message, token });

        
//         // Honeypot check — if filled, it's spam
//         if (website && website.trim() !== '') {
//             return NextResponse.json({ error: 'Bot detected' }, { status: 400 });
//         }

//         if (!checkRateLimit(ip)) {
//             return NextResponse.json({ error: 'Too many submissions. Please wait and try again later.' }, { status: 429 });
//         }

//         // reCAPTCHA validation (uncomment if reCAPTCHA is implemented)
//         // if (!token) {
//         //     return NextResponse.json({ error: 'No reCAPTCHA token' }, { status: 400 });
//         // }

//         // const isValid = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
//         //     method: 'POST',
//         //     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//         //     body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
//         // }).then(res => res.json());

//         // //TESTING ONLY
//         // console.log('reCAPTCHA response from Google:', isValid);
//         // console.log('Token:', token);
//         // console.log('Secret exists:', !!process.env.RECAPTCHA_SECRET_KEY);
//         // console.log('reCAPTCHA API Response:', isValid);

//         // if (!isValid.success) {
//         //     return NextResponse.json({ error: 'reCAPTCHA failed' }, { status: 400 });

//         // }
//         // temporary bypass for testing

//         if (!name || !email || !message) {
//         return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
//         }

//         if (
//             !name || name.length < 2 ||
//             !email || !email.includes('@') ||
//             !message || message.length < 10 ||
//             !phone || !phonePattern.test(phone) // Added phone validation
//         ) {
//             return NextResponse.json({ error: 'Invalid form data' }, { status: 400 });
//         }

//         // Optional: Validate address only if provided
//         if (address && address.length < 5) {
//             return NextResponse.json({ error: 'Address too short. Minimum 5 characters.' }, { status: 400 });
//         }
        

//         await sendContactEmail({ name, email, message, phone, address: address || 'N/A' });

//         return NextResponse.json({ success: true });
//     } catch (error) {
//         console.error('Email send error:', error);
//         return NextResponse.json({ error: 'Server error' }, { status: 500 });
//     }
// }

