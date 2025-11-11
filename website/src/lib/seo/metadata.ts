import { Metadata } from 'next';

export const baseMetadata: Metadata = {
  metadataBase: new URL('https://tomasmorales.dev'),
  title: {
    default: 'Tomas Morales | AI Product Engineer',
    template: '%s | Tomas Morales',
  },
  description:
    'AI Product Engineer and former CTO who builds generative AI systems. 10+ years experience delivering 0→1 products. Building AI-powered education infrastructure at 2 Hour Learning.',
  keywords: [
    'AI Product Engineer',
    'AI PM',
    'Generative AI',
    'Machine Learning',
    'Product Management',
    'Full-Stack Engineer',
    'CTO',
    'EdTech',
    'Next.js',
    'React',
    'TypeScript',
  ],
  authors: [{ name: 'Tomas Morales', url: 'https://tomasmorales.dev' }],
  creator: 'Tomas Morales',
  publisher: 'Tomas Morales',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://tomasmorales.dev',
    siteName: 'Tomas Morales Portfolio',
    title: 'Tomas Morales | AI Product Engineer',
    description:
      'AI Product Engineer and former CTO with 10+ years building generative AI systems. Shipped 50+ products from 0→1 across EdTech, FinTech, and more.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Tomas Morales - AI Product Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tomas Morales | AI Product Engineer',
    description:
      'AI Product Engineer and former CTO with 10+ years building generative AI systems. Shipped 50+ products from 0→1 across EdTech, FinTech, and more.',
    images: ['/og-image.jpg'],
  },
  verification: {
    google: 'your-google-verification-code',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '32x32' },
    ],
    apple: '/apple-touch-icon.png',
  },
};

export function generateStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Tomas Morales',
    jobTitle: 'AI Product Engineer',
    description:
      'AI Product Engineer and former CTO with 10+ years of experience',
    url: 'https://tomasmorales.dev',
    sameAs: [
      'https://www.linkedin.com/in/tomasmb1',
      'https://github.com/tomasmb',
    ],
    worksFor: {
      '@type': 'Organization',
      name: '2 Hour Learning',
    },
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Pontificia Universidad Católica de Chile',
    },
  };
}
