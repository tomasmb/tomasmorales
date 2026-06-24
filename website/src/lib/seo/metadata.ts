import { Metadata } from 'next';

export const baseMetadata: Metadata = {
  metadataBase: new URL('https://tomasmorales.dev'),
  title: {
    default: 'Tomas Morales | Staff Engineer at Alpha Anywhere',
    template: '%s | Tomas Morales',
  },
  description:
    'Staff Engineer at Alpha Anywhere, building the software behind next generation education. Former CTO, 10+ years shipping products across EdTech, FinTech, and more.',
  keywords: [
    'Tomas Morales',
    'Alpha Anywhere',
    'Staff Engineer',
    'Software Architecture',
    'Backend Engineering',
    'EdTech',
    'AI for Education',
    'Generative AI',
    'Full-Stack Engineer',
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
    siteName: 'Tomas Morales',
    title: 'Tomas Morales | Staff Engineer at Alpha Anywhere',
    description:
      'Staff Engineer at Alpha Anywhere, building the software behind next generation education. Former CTO, 10+ years shipping products.',
    images: [
      {
        url: '/og-image.jpg?v=3',
        width: 1200,
        height: 630,
        alt: 'Tomas Morales - Staff Engineer at Alpha Anywhere',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tomas Morales | Staff Engineer at Alpha Anywhere',
    description:
      'Staff Engineer at Alpha Anywhere, building the software behind next generation education. Former CTO, 10+ years shipping products.',
    images: ['/og-image.jpg?v=3'],
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
    jobTitle: 'Staff Engineer',
    description:
      'Staff Engineer at Alpha Anywhere, building the software behind next generation education. Former CTO with 10+ years building products across EdTech, FinTech, and more.',
    url: 'https://tomasmorales.dev',
    sameAs: [
      'https://www.linkedin.com/in/tomasmb1',
      'https://github.com/tomasmb',
    ],
    worksFor: {
      '@type': 'Organization',
      name: 'Alpha Anywhere',
    },
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Pontificia Universidad Católica de Chile',
    },
  };
}
