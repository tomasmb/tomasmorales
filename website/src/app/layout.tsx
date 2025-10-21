import type { Metadata, Viewport } from 'next';
import { baseMetadata } from '@/lib/seo/metadata';
import './globals.css';

export const metadata: Metadata = baseMetadata;

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#F9FAFB',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
