# Tomas Morales - Personal Portfolio Website

A modern, minimal, and professional personal portfolio website built with Next.js 15, showcasing AI Product Engineering expertise and leadership experience.

## 🚀 Live Demo

Visit the live website at [tomasmorales.dev](https://tomasmorales.dev)

## ✨ Features

- 🌐 **Multilingual Support** - English and Spanish with next-intl
- 🎨 **Modern Design** - Clean, minimal UI with Tailwind CSS
- ⚡ **Performance Optimized** - Server Components, Image Optimization, Turbopack
- 📱 **Fully Responsive** - Mobile-first design approach
- 🔍 **SEO Optimized** - Structured data, metadata, Open Graph tags
- ♿ **Accessible** - WCAG compliant with semantic HTML
- 🎭 **Smooth Animations** - Framer Motion for subtle interactions
- 📊 **Expandable Sections** - Interactive experience cards
- 🔄 **Infinite Carousel** - Animated skills showcase
- 🎯 **Type-Safe** - Full TypeScript implementation

## 🛠️ Tech Stack

### Core

- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript 5** - Type safety

### Styling

- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion** - Animation library

### Internationalization

- **next-intl** - i18n routing and translations

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Turbopack** - Fast bundler

## 📁 Project Structure

```
website/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── [locale]/           # Localized routes
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── layout.tsx          # Root layout with SEO
│   │   └── globals.css         # Global styles
│   ├── components/
│   │   ├── ui/                 # UI components
│   │   │   ├── Navigation.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── LanguageSwitcher.tsx
│   │   └── sections/           # Page sections
│   │       ├── Hero.tsx
│   │       ├── About.tsx
│   │       ├── Experience.tsx
│   │       ├── Skills.tsx
│   │       ├── Industries.tsx
│   │       ├── Blog.tsx
│   │       ├── Beliefs.tsx
│   │       └── Contact.tsx
│   ├── lib/
│   │   ├── utils/              # Utility functions
│   │   ├── constants/          # Constants (skills, etc.)
│   │   └── seo/                # SEO metadata & structured data
│   ├── types/                  # TypeScript types
│   ├── hooks/                  # Custom React hooks
│   ├── locales/                # i18n translations
│   │   ├── en.json
│   │   └── es.json
│   └── middleware.ts           # i18n middleware
├── public/                     # Static assets
│   ├── tomas_web.webp
│   └── ...
├── docs/                       # Documentation
│   ├── SEO_BEST_PRACTICES.md
│   └── NEXTJS_BEST_PRACTICES.md
├── i18n.ts                     # i18n configuration
├── next.config.ts              # Next.js configuration
├── tailwind.config.ts          # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
├── .eslintrc.json              # ESLint configuration
├── .prettierrc                 # Prettier configuration
└── package.json
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, or pnpm

### Installation

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
```

## 🌐 Internationalization

The website supports English (default) and Spanish.

### Adding a New Language

1. Add locale to `i18n.ts`:

```typescript
export const locales = ['en', 'es', 'fr'] as const;
```

2. Create translation file `src/locales/fr.json`

3. Translations are automatically applied via middleware

### Accessing Translations

```typescript
import { useTranslations } from 'next-intl';

function Component() {
  const t = useTranslations('hero');
  return <h1>{t('title')}</h1>;
}
```

## 🎨 Design System

### Color Palette

```css
--background: #f9fafb /* Soft white */ --foreground: #111827 /* Near black */
  --accent: #2563eb /* Blue */ --muted: #e5e7eb /* Light gray */;
```

### Typography

- **Font Family:** Inter (400, 500, 600, 700)
- **Base Size:** 16px
- **Headings:**
  - h1: 2.25rem - 3rem
  - h2: 1.875rem - 2.25rem
  - h3: 1.25rem - 1.5rem

### Spacing

- **Section Padding:** py-20
- **Container Max Width:** max-w-7xl
- **Border Radius:** 0.75rem - 1rem

## 📊 Components Overview

### Navigation

- Sticky header with scroll detection
- Mobile-responsive hamburger menu
- Language switcher
- Smooth scroll to sections

### Hero Section

- Professional photo with hover effect
- Dynamic introduction text
- Technology tags
- Social media links

### About Section

- Bio paragraph
- Philosophy statements
- Personal interests

### Experience Section

- Expandable accordion cards
- Current position highlighted
- Technology stacks
- Downloadable CV

### Skills Carousel

- Infinite horizontal scroll
- Smooth animation with Framer Motion
- 17+ technologies displayed

### Industries Section

- Industry tags
- Hover effects

### Blog Section

- Post previews
- Coming soon placeholders
- Ready for integration with CMS

### Beliefs Section

- Core principles
- Contextual explanations
- Two-column layout on desktop

### Contact Section

- Email, LinkedIn, GitHub links
- Click-to-action buttons
- External link indicators

### Footer

- Built with credits
- Location information

## 🔍 SEO Features

- ✅ Server-side rendering
- ✅ Metadata API with Open Graph tags
- ✅ Structured data (JSON-LD)
- ✅ Semantic HTML5
- ✅ Image optimization
- ✅ Font optimization
- ✅ Mobile-first responsive design
- ✅ Clean URL structure
- ✅ i18n with hreflang

See [SEO_BEST_PRACTICES.md](./docs/SEO_BEST_PRACTICES.md) for details.

## 📋 Code Quality Standards

### File Size Limits

- Maximum 500 lines per file (enforced by ESLint)
- Functions limited to 50 lines
- Complexity limit of 10

### Code Style

- Single Responsibility Principle
- DRY (Don't Repeat Yourself)
- Composition over inheritance
- TypeScript strict mode

See [NEXTJS_BEST_PRACTICES.md](./docs/NEXTJS_BEST_PRACTICES.md) for details.

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Deploy automatically

### Other Platforms

```bash
npm run build
npm run start
```

Deploy the `.next` folder to your hosting provider.

## 📈 Performance

- **Lighthouse Score:** 95+ across all metrics
- **Core Web Vitals:** Optimized
- **Bundle Size:** < 200kb (gzipped)
- **Time to Interactive:** < 3s

## 🔒 Security

- No exposed API keys
- `poweredByHeader: false`
- Content Security Policy ready
- Secure external links (rel="noopener noreferrer")

## 📄 License

© 2025 Tomas Morales. All rights reserved.

## 👤 Author

**Tomas Morales**

- Website: [tomasmorales.dev](https://tomasmorales.dev)
- LinkedIn: [linkedin.com/in/tomasmb1](https://linkedin.com/in/tomasmb1)
- GitHub: [@tomasmb](https://github.com/tomasmb)
- Email: tomas.morales.ber@gmail.com

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Animated with [Framer Motion](https://www.framer.com/motion/)
- Icons from [Lucide](https://lucide.dev/)
- Internationalization with [next-intl](https://next-intl-docs.vercel.app/)

---

Built with ❤️ using Next.js 15 and Tailwind CSS
