import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { StoreProvider } from '@/lib/store';
import Navbar from '@/components/layout/Navbar';
import CartDrawer from '@/components/layout/CartDrawer';
import ToastContainer from '@/components/layout/ToastContainer';
import MobileNav from '@/components/layout/MobileNav';
import Footer from '@/components/layout/Footer';
import FloatingLivePlayer from '@/components/live/FloatingLivePlayer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: 'LYVO Atelier | Modern Luxury E-Commerce & Live Shopping Platform',
  description:
    'Discover curated collections of luxury tailoring, Tuscan leather goods, sapphire horology, and high-fidelity acoustic technology. Shop interactive live runway shows in real-time.',
  keywords: [
    'LYVO',
    'luxury ecommerce',
    'live shopping',
    'cashmere overcoats',
    'leather weekender bag',
    'automatic watch',
    'studio headphones',
    'premium fashion Egypt'
  ],
  authors: [{ name: 'LYVO Team' }],
  icons: {
    icon: '/favicon.ico',
    apple: '/icon.png',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased font-sans`}>
      <body className="min-h-full flex flex-col bg-[#FAFAF8] text-zinc-950 pb-mobile-nav md:pb-0">
        <StoreProvider>
          <Navbar />
          <CartDrawer />
          <ToastContainer />
          <main className="flex-1">{children}</main>
          <FloatingLivePlayer />
          <MobileNav />
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
