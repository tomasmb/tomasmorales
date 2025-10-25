import { MetadataRoute } from 'next';
import { locales } from '../../i18n';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://tomasmorales.dev';
  const lastModified = new Date();

  // Root URL entry
  const rootEntry = {
    url: baseUrl,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 1,
    alternates: {
      languages: Object.fromEntries(
        locales.map(loc => [loc, `${baseUrl}/${loc}`])
      ),
    },
  };

  // Generate entries for each locale
  const localeEntries = locales.map(locale => ({
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

  return [rootEntry, ...localeEntries];
}
