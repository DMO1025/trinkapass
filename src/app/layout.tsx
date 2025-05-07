
import type { Metadata } from 'next';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS FIRST
import './globals.css'; // Tailwind and custom global styles AFTER
import { Toaster } from '@/components/ui/toaster'; // ShadCN Toaster
import Header from '@/components/header';
import Footer from '@/components/footer';
import { AuthProvider } from '@/contexts/AuthContext';
import BootstrapClient from '@/components/BootstrapClient'; // Component to import Bootstrap JS

export const metadata: Metadata = {
  title: 'TrinkaPass - Your Gateway to Unforgettable Experiences',
  description: 'Buy and sell tickets for the best events with TrinkaPass.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`antialiased d-flex flex-column min-vh-100`}>
        <AuthProvider>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <Toaster />
        </AuthProvider>
        <BootstrapClient /> {/* Add Bootstrap JS loader */}
      </body>
    </html>
  );
}

