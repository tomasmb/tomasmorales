'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export function About() {
  const t = useTranslations('about');

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
          <p className="text-lg text-foreground/80 mb-8 leading-relaxed">
            {t('bio')}
          </p>

          <p className="text-foreground/70 text-sm italic">{t('funFact')}</p>
        </motion.div>
      </div>
    </section>
  );
}
