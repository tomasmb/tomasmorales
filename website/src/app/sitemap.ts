import { MetadataRoute } from 'next';
import { locales } from '../../i18n';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://tomasmorales.dev';
  const lastModified = new Date();

  // Generate entries for each locale
  return locales.map(locale => ({
    url: `${baseUrl}/${locale}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 1,
    alternates: {
      languages: Object.fromEntries(
        locales.map(loc => [loc, `${baseUrl}/${loc}`])
      ),
    },
  }));
}
