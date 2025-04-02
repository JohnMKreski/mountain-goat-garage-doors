interface Props {
    name: string;
    email: string;
    phone: string;
    address?: string;
    message: string;
  }
  
  export const ContactEmail: React.FC<Props> = ({
    name,
    email,
    phone,
    address,
    message,
  }) => (
    <div>
      <h2>New Contact Message from {name}</h2>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Phone:</strong> {phone}</p>
      <p><strong>Address:</strong> {address || 'N/A'}</p>
      <p><strong>Message:</strong></p>
      <p>{message}</p>
    </div>
  );
  