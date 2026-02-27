'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export function About() {
  const t = useTranslations('about');

  const quotes = [t('philosophy.quote1'), t('philosophy.quote2'), t('philosophy.quote3')];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8">{t('title')}</h2>
          <p className="text-lg text-foreground/80 mb-10 leading-relaxed">
            {t('bio')}
          </p>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-accent">
              {t('philosophy.title')}
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              {quotes.map((quote, i) => (
                <div
                  key={i}
                  className="p-4 bg-accent/5 border border-accent/10 rounded-xl"
                >
                  <p className="text-foreground/80 text-sm italic leading-relaxed">
                    &ldquo;{quote}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </div>

          <p className="text-foreground/70 text-sm italic">{t('funFact')}</p>
        </motion.div>
      </div>
    </section>
  );
}
