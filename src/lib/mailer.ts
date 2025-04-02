import { Resend } from 'resend';
import { ContactEmail } from '@/components/ContactEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

type ContactFormData = {
  name: string;
  email: string;
  message: string;
  phone: string;
  address?: string;
};

export async function sendContactEmail({ 
  name, 
  email, 
  message, 
  phone, 
  address }: ContactFormData) {
    const emailContent = ContactEmail({ name, email, phone, address, message }); // Resolve the Promise
    
    const response = await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: process.env.EMAIL_TO!,
      subject: `📬 New Inquiry from ${name}`,
      react: emailContent,
    });

  if (response.error) {
    console.error('Resend error:', response.error);
    throw new Error(response.error.message);
  }
}