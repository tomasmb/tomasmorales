# SEO Best Practices for 2025

This document outlines the SEO best practices implemented in this portfolio website, based on the latest 2025 recommendations for Next.js applications.

## Core SEO Strategy

### 1. Server-Side Rendering (SSR) & Static Generation

**Why it matters:** Search engines can crawl and index content immediately, improving SEO performance.

**Implementation:**

- Using Next.js 15 App Router with Server Components by default
- Static generation for all pages (`generateStaticParams`)
- Server-side rendering for dynamic metadata

```typescript
// Example: src/app/[locale]/layout.tsx
export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}
```

### 2. Metadata API

**Why it matters:** Proper metadata helps search engines understand page content and display rich snippets.

**Implementation:**

- Centralized metadata configuration in `src/lib/seo/metadata.ts`
- Dynamic metadata with `generateMetadata` function
- Comprehensive Open Graph and Twitter Card tags

```typescript
export const baseMetadata: Metadata = {
  metadataBase: new URL('https://tomasmorales.dev'),
  title: {
    default: 'Tomas Morales | AI Product Engineer',
    template: '%s | Tomas Morales',
  },
  // ... additional metadata
};
```

### 3. Structured Data (JSON-LD)

**Why it matters:** Structured data helps search engines understand relationships and display rich results.

**Implementation:**

- Person schema for professional profile
- Organization schema for work experience
- Embedded in root layout for all pages

```typescript
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Tomas Morales',
  jobTitle: 'AI Product Engineer',
  // ... additional properties
};
```

### 4. Image Optimization

**Why it matters:** Fast-loading images improve Core Web Vitals and user experience.

**Implementation:**

- Next.js Image component with automatic optimization
- Modern formats (AVIF, WebP)
- Responsive images with proper sizing
- Priority loading for above-the-fold images

```typescript
<Image
  src="/tomas_web.jpg"
  alt="Tomas Morales"
  fill
  priority
  className="rounded-2xl"
/>
```

### 5. Performance Optimization

**Why it matters:** Core Web Vitals (LCP, FID, CLS) are ranking factors.

**Implementation:**

- Turbopack for faster builds
- Code splitting with App Router
- Font optimization with `next/font`
- Lazy loading for below-the-fold content

### 6. Mobile-First Responsive Design

**Why it matters:** Mobile-first indexing means Google predominantly uses mobile version for ranking.

**Implementation:**

- Tailwind CSS mobile-first approach
- Responsive breakpoints (sm, md, lg)
- Touch-friendly navigation
- Viewport meta tag properly configured

### 7. Semantic HTML

**Why it matters:** Proper HTML structure helps search engines understand content hierarchy.

**Implementation:**

- Semantic HTML5 elements (`<nav>`, `<section>`, `<footer>`)
- Proper heading hierarchy (h1 → h2 → h3)
- Descriptive ARIA labels for accessibility

### 8. URL Structure & Internationalization

**Why it matters:** Clean URLs and proper i18n help with global SEO.

**Implementation:**

- Clean, descriptive URLs
- Locale-based routing with `next-intl`
- `hreflang` tags for language variants
- Proper canonical URLs

### 9. Sitemap & Robots.txt

**Why it matters:** Helps search engines discover and crawl pages efficiently.

**Implementation:**
To be added:

```typescript
// src/app/sitemap.ts
export default function sitemap() {
  return [
    {
      url: 'https://tomasmorales.dev',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    // ... additional URLs
  ];
}
```

### 10. Page Speed Insights

**Target Metrics:**

- Largest Contentful Paint (LCP): < 2.5s
- First Input Delay (FID): < 100ms
- Cumulative Layout Shift (CLS): < 0.1

**Optimizations:**

- Minimal JavaScript bundle
- Efficient CSS with Tailwind
- Optimized fonts with `font-display: swap`
- Preloading critical resources

## Content SEO

### Keywords Strategy

**Primary Keywords:**

- AI Product Engineer
- AI PM
- Generative AI
- Product Management
- Full-Stack Engineer

**Long-tail Keywords:**

- AI Product Engineer portfolio
- Generative AI systems builder
- Former CTO AI products

### Content Structure

**Best Practices:**

1. Clear h1 on every page
2. Descriptive subheadings (h2, h3)
3. Short paragraphs (2-3 lines)
4. Bullet points for highlights
5. Internal linking (anchor links)

## Technical SEO Checklist

- [x] HTTPS enabled
- [x] Proper metadata tags
- [x] Open Graph tags
- [x] Twitter Card tags
- [x] Structured data (JSON-LD)
- [x] Image optimization
- [x] Mobile responsive
- [x] Fast loading times
- [x] Semantic HTML
- [x] Clean URL structure
- [ ] Sitemap.xml
- [ ] Robots.txt
- [x] i18n implementation
- [x] No broken links
- [x] Proper heading hierarchy

## Monitoring & Analytics

### Tools to Use:

1. **Google Search Console** - Monitor indexing and search performance
2. **Google Analytics 4** - Track user behavior
3. **PageSpeed Insights** - Monitor Core Web Vitals
4. **Lighthouse** - Comprehensive performance audit

### Key Metrics to Track:

- Organic search traffic
- Click-through rate (CTR)
- Average position in search results
- Core Web Vitals scores
- Page load times

## Next Steps

1. Submit sitemap to Google Search Console
2. Set up Google Analytics 4
3. Create blog content for additional SEO value
4. Build backlinks through:
   - LinkedIn articles
   - GitHub contributions
   - Speaking engagements
   - Guest posts

## Resources

- [Next.js SEO Guide](https://nextjs.org/learn/seo/introduction-to-seo)
- [Google Search Central](https://developers.google.com/search)
- [Core Web Vitals](https://web.dev/vitals/)
- [Schema.org](https://schema.org/)
