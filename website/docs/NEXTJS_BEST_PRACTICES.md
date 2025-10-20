# Next.js 15 Best Practices (2025 Edition)

This document outlines the Next.js best practices implemented in this portfolio website, following 2025 standards for optimal performance, maintainability, and scalability.

## Architecture & Project Structure

### App Router (Recommended for 2025)

We're using the Next.js App Router, which is the recommended approach for all new projects.

**Benefits:**

- Server Components by default (better performance)
- Improved data fetching patterns
- Built-in layouts and loading states
- Better code organization

### Folder Structure

```
website/
├── src/
│   ├── app/
│   │   ├── [locale]/          # Internationalized routes
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── layout.tsx         # Root layout
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/               # Reusable UI components
│   │   │   ├── Navigation.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── LanguageSwitcher.tsx
│   │   └── sections/         # Page sections
│   │       ├── Hero.tsx
│   │       ├── About.tsx
│   │       ├── Experience.tsx
│   │       └── ...
│   ├── lib/
│   │   ├── utils/            # Utility functions
│   │   ├── constants/        # Constants and config
│   │   └── seo/             # SEO utilities
│   ├── types/               # TypeScript types
│   ├── hooks/               # Custom React hooks
│   └── locales/             # i18n translations
├── public/                  # Static assets
├── docs/                    # Documentation
└── ...config files
```

**Rationale:**

- Clear separation of concerns
- Easy to navigate and maintain
- Scalable for larger applications
- Follows Next.js 15 conventions

## Code Quality & Standards

### 1. File Size Limits

**Rule:** No file should exceed 500 lines (except configuration JSON files)

**Implementation:**

- ESLint rule: `max-lines: ["error", { "max": 500 }]`
- Break large components into smaller, reusable pieces
- Use composition over monolithic components

**Example:**

```typescript
// ❌ Bad: 800-line component
export function Dashboard() {
  // Hundreds of lines...
}

// ✅ Good: Composed components
export function Dashboard() {
  return (
    <>
      <DashboardHeader />
      <DashboardStats />
      <DashboardChart />
      <DashboardTable />
    </>
  );
}
```

### 2. Function Complexity

**Rule:** Functions should be small and focused (max 50 lines)

**Implementation:**

- ESLint rule: `max-lines-per-function: ["warn", { "max": 50 }]`
- Single Responsibility Principle
- Extract complex logic into separate functions

### 3. DRY Principle

**Rule:** Don't Repeat Yourself

**Implementation:**

- Create reusable components
- Extract common logic to utility functions
- Use constants for repeated values

```typescript
// ❌ Bad: Repeated styles
<div className="px-6 py-3 bg-background border border-border rounded-xl">
<div className="px-6 py-3 bg-background border border-border rounded-xl">

// ✅ Good: Reusable component
<Card className="px-6 py-3">
```

### 4. TypeScript Strict Mode

**Configuration:**

```json
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true
  }
}
```

## Performance Best Practices

### 1. Server Components by Default

**Rule:** Use Server Components unless you need client interactivity

```typescript
// ✅ Server Component (default)
export default function About() {
  return <div>Static content</div>;
}

// ✅ Client Component (when needed)
'use client';
export function InteractiveChart() {
  const [data, setData] = useState([]);
  return <Chart data={data} />;
}
```

**Benefits:**

- Smaller JavaScript bundles
- Faster initial page loads
- Better SEO

### 2. Image Optimization

**Rule:** Always use next/image for images

```typescript
import Image from 'next/image';

<Image
  src="/profile.png"
  alt="Profile"
  width={200}
  height={200}
  priority  // For above-the-fold images
/>
```

**Benefits:**

- Automatic format optimization (WebP, AVIF)
- Lazy loading
- Responsive images
- Improved Core Web Vitals

### 3. Font Optimization

**Rule:** Use next/font for web fonts

```typescript
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});
```

**Benefits:**

- No layout shift
- Automatic optimization
- Self-hosting

### 4. Code Splitting

**Automatic with App Router:**

- Each route is automatically code-split
- Components are bundled efficiently
- Dynamic imports for heavy components

```typescript
// Dynamic import for heavy components
const HeavyChart = dynamic(() => import('./HeavyChart'), {
  loading: () => <Skeleton />,
  ssr: false,
});
```

## React Best Practices

### 1. Composition Over Inheritance

```typescript
// ✅ Good: Composition
function Card({ children, className }: CardProps) {
  return <div className={cn('rounded-lg', className)}>{children}</div>;
}

function ProfileCard() {
  return (
    <Card className="bg-blue-500">
      <Avatar />
      <Name />
    </Card>
  );
}
```

### 2. Custom Hooks for Reusable Logic

```typescript
// src/hooks/useScrollPosition.ts
export function useScrollPosition() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollY;
}
```

### 3. Avoid Prop Drilling

Use React Context or props composition:

```typescript
// ✅ Good: Context for deep props
const ThemeContext = createContext();

function App() {
  return (
    <ThemeContext.Provider value={{ theme: 'dark' }}>
      <Dashboard />
    </ThemeContext.Provider>
  );
}
```

## Styling Best Practices

### 1. Tailwind CSS Utility-First

**Benefits:**

- No CSS file management
- Consistent design system
- Small bundle size with purging
- Easy responsive design

```typescript
<div className="px-4 sm:px-6 lg:px-8 bg-background/95">
```

### 2. CSS Variables for Theme

```css
:root {
  --background: #f9fafb;
  --foreground: #111827;
  --accent: #2563eb;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
}
```

### 3. Avoid Inline Styles

```typescript
// ❌ Bad
<div style={{ padding: '20px', color: 'blue' }}>

// ✅ Good
<div className="p-5 text-blue-600">
```

## Internationalization (i18n)

### Best Practices with next-intl

**1. Centralized translations:**

```typescript
// src/locales/en.json
{
  "hero": {
    "title": "Hi, I'm Tomas"
  }
}
```

**2. Type-safe translations:**

```typescript
const t = useTranslations('hero');
const title = t('title'); // Type-checked!
```

**3. Server-side rendering:**

- Translations loaded on server
- No client-side delay
- Better SEO

## Security Best Practices

### 1. Environment Variables

```typescript
// ❌ Bad: Exposing secrets
const API_KEY = 'abc123';

// ✅ Good: Environment variables
const API_KEY = process.env.API_KEY;
```

### 2. Disable poweredByHeader

```typescript
// next.config.ts
const nextConfig = {
  poweredByHeader: false, // Don't expose framework
};
```

### 3. Content Security Policy

```typescript
// Add CSP headers in middleware or next.config.ts
const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
`;
```

## Testing Best Practices

### 1. Component Testing

```typescript
// Use React Testing Library
import { render, screen } from '@testing-library/react';

test('renders hero section', () => {
  render(<Hero />);
  expect(screen.getByText(/hi, i'm tomas/i)).toBeInTheDocument();
});
```

### 2. E2E Testing

```typescript
// Use Playwright
test('navigation works', async ({ page }) => {
  await page.goto('/');
  await page.click('text=About');
  expect(page.url()).toContain('#about');
});
```

## Accessibility Best Practices

### 1. Semantic HTML

```typescript
// ✅ Good
<nav>
  <a href="#about">About</a>
</nav>

// ❌ Bad
<div onClick={handleClick}>About</div>
```

### 2. ARIA Labels

```typescript
<button aria-label="Toggle menu">
  <Menu />
</button>
```

### 3. Keyboard Navigation

- All interactive elements should be keyboard accessible
- Proper focus management
- Skip links for navigation

## Build & Deployment

### 1. Turbopack (Next.js 15)

```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build --turbopack"
  }
}
```

**Benefits:**

- 20x faster than Webpack
- Incremental computation
- Better developer experience

### 2. Static Export (if applicable)

```typescript
// next.config.ts
const nextConfig = {
  output: 'export', // For static sites
};
```

### 3. Edge Runtime

For dynamic routes that need global distribution:

```typescript
export const runtime = 'edge';
```

## Monitoring & Analytics

### 1. Performance Monitoring

- Use Vercel Analytics
- Monitor Core Web Vitals
- Track bundle sizes

### 2. Error Tracking

```typescript
// error.tsx
'use client';

export default function Error({ error }: { error: Error }) {
  useEffect(() => {
    // Log to error tracking service
    console.error(error);
  }, [error]);

  return <div>Something went wrong!</div>;
}
```

## Linting & Formatting

### 1. ESLint Configuration

```json
{
  "extends": [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ],
  "rules": {
    "max-lines": ["error", { "max": 500 }],
    "complexity": ["warn", 10]
  }
}
```

### 2. Prettier Configuration

```json
{
  "semi": true,
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2
}
```

### 3. Pre-commit Hooks

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"]
  }
}
```

## Summary

This project follows the latest Next.js 15 best practices for 2025:

- ✅ App Router for optimal performance
- ✅ Server Components by default
- ✅ TypeScript strict mode
- ✅ File size limits (max 500 lines)
- ✅ Code quality rules (complexity, DRY)
- ✅ Image and font optimization
- ✅ i18n with next-intl
- ✅ SEO optimization
- ✅ Accessibility standards
- ✅ Security best practices

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Vercel Best Practices](https://vercel.com/docs/concepts/best-practices)
- [Web.dev](https://web.dev/)
