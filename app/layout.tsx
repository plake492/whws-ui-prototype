import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import ThemeRegistry from '@/components/ThemeRegistry';
import Footer from '@/components/Footer';
import { AuthProvider } from '@/contexts/AuthContext';
import AnalyticsWrapper from '@/components/AnalyticsWrapper';
import Navigation from '@/components/UI/Navigation';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "WHWS - Women's Health & Wellness Society",
  description: "Supporting women's health and wellness through community, resources, and expert guidance",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AuthProvider>
          <ThemeRegistry>
            <AnalyticsWrapper>{children}</AnalyticsWrapper>
          </ThemeRegistry>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
