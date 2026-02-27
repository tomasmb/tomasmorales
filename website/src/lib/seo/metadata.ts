import { Metadata } from 'next';

export const baseMetadata: Metadata = {
  metadataBase: new URL('https://tomasmorales.dev'),
  title: {
    default: 'Tomas Morales | Founder of Arbor Learning',
    template: '%s | Tomas Morales',
  },
  description:
    'Founder of Arbor Learning — an AI-powered adaptive PreU helping Chilean students master the PAES. 10+ years shipping products, former CTO, building the future of education.',
  keywords: [
    'Arbor Learning',
    'Tomas Morales',
    'PreU digital',
    'PAES',
    'adaptive education',
    'EdTech',
    'AI Product Engineer',
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
    title: 'Tomas Morales | Founder of Arbor Learning',
    description:
      'Building the future of education with Arbor Learning — an AI-powered adaptive PreU for PAES mastery. 10k+ questions, 200+ lessons per subject, all AI-generated and validated.',
    images: [
      {
        url: '/og-image.jpg?v=2',
        width: 1200,
        height: 630,
        alt: 'Tomas Morales - Founder of Arbor Learning',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tomas Morales | Founder of Arbor Learning',
    description:
      'Building the future of education with Arbor Learning — an AI-powered adaptive PreU for PAES mastery. 10k+ questions, 200+ lessons per subject, all AI-generated and validated.',
    images: ['/og-image.jpg?v=2'],
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
    jobTitle: 'Founder & CEO',
    description:
      'Founder of Arbor Learning, an AI-powered adaptive PreU for PAES mastery. Former CTO with 10+ years building products across EdTech, FinTech, and more.',
    url: 'https://tomasmorales.dev',
    sameAs: [
      'https://www.linkedin.com/in/tomasmb1',
      'https://github.com/tomasmb',
      'https://preu.arbor.school',
    ],
    worksFor: {
      '@type': 'Organization',
      name: 'Arbor Learning',
      url: 'https://preu.arbor.school',
      foundingDate: '2026',
    },
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Pontificia Universidad Católica de Chile',
    },
  };
}
