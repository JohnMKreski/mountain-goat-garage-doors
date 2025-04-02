// /src/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
// import { sendContactEmail } from '@/lib/mailer';
// import { checkRateLimit } from '@/lib/rateLimiter';

//API test endpoint
export async function GET() {
    return NextResponse.json({ status: 'Contact API is up' });
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        console.log('Received POST body:', body);
    
        const ip = req.headers.get('x-forwarded-for') || 'unknown';
        console.log('IP Address:', ip);
    
        // 🔄 Lazy import only when needed
        const { sendContactEmail } = await import('@/lib/mailer');
        await sendContactEmail(body);
    
        return NextResponse.json({ success: true });
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

