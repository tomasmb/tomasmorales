import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="py-8 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-foreground/60">
          <p>{t('built')}</p>
          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/in/tomasmb1"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              linkedin.com/in/tomasmb1
            </a>
            <span>·</span>
            <p>{t('openSource')}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
