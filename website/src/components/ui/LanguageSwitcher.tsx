'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  const switchLanguage = (locale: string) => {
    const segments = pathname.split('/');
    if (segments[1] === 'en' || segments[1] === 'es') {
      segments[1] = locale;
    } else {
      segments.splice(1, 0, locale);
    }
    router.push(segments.join('/'));
  };

  return (
    <div className="flex items-center gap-2">
      <Globe size={16} className="text-foreground/60" />
      <button
        onClick={() => switchLanguage('en')}
        className="text-sm font-medium text-foreground/80 hover:text-foreground"
      >
        EN
      </button>
      <span className="text-foreground/40">/</span>
      <button
        onClick={() => switchLanguage('es')}
        className="text-sm font-medium text-foreground/80 hover:text-foreground"
      >
        ES
      </button>
    </div>
  );
}
