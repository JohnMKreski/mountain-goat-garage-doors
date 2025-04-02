import './globals.css';
import '@/lib/fontawesome';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Inter } from 'next/font/google';
import SEO from '@/components/SEO';
// import { Space_Grotesk } from 'next/font/google';

export const metadata = {
  title: 'Mountain Goat Garage Doors',
  description: 'Garge Door company in Buena Vista',
  icons: {
    icon: '/favicon/favicon.ico',
  },
};

// const spaceGrotesk = Space_Grotesk({
//   subsets: ['latin'],
//   weight: ['400', '500', '700'],
//   display: 'swap',
// });

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
    <SEO />
    <html lang="en" className={inter.className}>
      <body className="d-flex flex-column min-vh-100">
        <Navbar />
        <main className="flex-grow-1">{children}</main>
        <Footer />
      </body>
    </html>
    </>
  );
}

