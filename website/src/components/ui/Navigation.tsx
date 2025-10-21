'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { Link } from '@/i18n/navigation';
import { Menu, X } from 'lucide-react';
import { LanguageSwitcher } from './LanguageSwitcher';
import { features } from '@/lib/constants/features';

export function Navigation() {
  const t = useTranslations('nav');
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { key: 'home', href: '/', type: 'link' as const },
    {
      key: 'about',
      href: '#about',
      type: 'hash' as const,
    },
    {
      key: 'experience',
      href: '#experience',
      type: 'hash' as const,
    },
    ...(features.projects
      ? [
          {
            key: 'projects',
            href: '#projects',
            type: 'hash' as const,
          },
        ]
      : []),
    {
      key: 'blog',
      href: '#blog',
      type: 'hash' as const,
    },
    {
      key: 'beliefs',
      href: '#beliefs',
      type: 'hash' as const,
    },
    {
      key: 'contact',
      href: '#contact',
      type: 'hash' as const,
    },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all ${
        isScrolled ? 'bg-background/95 backdrop-blur-sm shadow-sm' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="font-bold text-xl text-foreground">
            TM
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map(item => {
              // Use anchor tags for same-page hash navigation, Link for cross-route
              if (item.type === 'hash') {
                return (
                  <a
                    key={item.key}
                    href={item.href}
                    className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                  >
                    {t(item.key as never)}
                  </a>
                );
              }

              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                >
                  {t(item.key as never)}
                </Link>
              );
            })}
            <LanguageSwitcher />
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <div className="px-4 py-4 space-y-3">
            {navItems.map(item => {
              // Use anchor tags for same-page hash navigation, Link for cross-route
              if (item.type === 'hash') {
                return (
                  <a
                    key={item.key}
                    href={item.href}
                    className="block py-2 text-sm font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {t(item.key as never)}
                  </a>
                );
              }

              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className="block py-2 text-sm font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {t(item.key as never)}
                </Link>
              );
            })}
            <LanguageSwitcher />
          </div>
        </div>
      )}
    </nav>
  );
}
