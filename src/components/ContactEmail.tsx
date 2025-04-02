// components/ContactEmail.tsx
import React from 'react';

interface ContactEmailProps {
  name: string;
  email: string;
  phone: string;
  address?: string;
  message: string;
}

export const ContactEmail = ({
  name,
  email,
  phone,
  address,
  message,
}: ContactEmailProps): React.ReactElement => {
  return (
    <div>
      <h2>New Contact Message from {name}</h2>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Phone:</strong> {phone}</p>
      <p><strong>Address:</strong> {address || 'N/A'}</p>
      <p><strong>Message:</strong></p>
      <p>{message}</p>
    </div>
  );
};

