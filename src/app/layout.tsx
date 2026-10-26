import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { FavoritesProvider } from '@/context/FavoritesContext';

export const metadata: Metadata = {
  title: 'Project Explorer',
  description: 'Lightweight enterprise project management portal',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased flex flex-col">
        <FavoritesProvider>
          <Navbar />
          <div className="flex-1 flex flex-col">{children}</div>
          <Footer />
        </FavoritesProvider>
      </body>
    </html>
  );
}
