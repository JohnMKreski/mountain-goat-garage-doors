import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

type ContactFormData = {
  name: string;
  email: string;
  message: string;
  phone: string;
  address?: string;
};

export async function sendContactEmail({ name, email, message, phone, address }: ContactFormData) {
  const response = await resend.emails.send({
    from: process.env.EMAIL_FROM!,
    to: process.env.EMAIL_TO!,
    subject: `📬 New Inquiry from ${name} — Mountain Goat Contact Form`,
    text: `You’ve received a new message from your website:

    Name: ${name}
    Email: ${email}
    Phone: ${phone || 'Not provided'}
    Address: ${address || 'Not provided'}

    Message:
    ${message}`,
        html: `
          <div style="font-family: sans-serif; font-size: 15px; line-height: 1.6;">
            <p>You’ve received a new message from your website:</p>
            <ul>
              <li><strong>Name:</strong> ${name}</li>
              <li><strong>Email:</strong> ${email}</li>
              <li><strong>Phone:</strong> ${phone}</li>
              <li><strong>Address:</strong> ${address || 'Not provided'}</li>
            </ul>
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-line;">${message}</p>
          </div>
        `,
  });
  
  if (response.error) {
    console.error('Resend error:', response.error);
    throw new Error(response.error.message);
  }

}