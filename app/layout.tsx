import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { ReduxProvider } from '@/lib/redux/provider';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TaharLuxe | Premium Shopping Experience',
  description: 'Shop the latest trends in fashion, tech, and home decor.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ReduxProvider>
           {children}
            <Toaster />
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}