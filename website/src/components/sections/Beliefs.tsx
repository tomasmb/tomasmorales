'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export function Beliefs() {
  const t = useTranslations('beliefs');
  const principles = JSON.parse(JSON.stringify(t.raw('principles')));

  return (
    <section id="beliefs" className="py-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('title')}</h2>
          <p className="text-lg text-foreground/70 mb-12 leading-relaxed">
            {t('intro')}
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {principles.map((principle: never, index: number) => (
              <div
                key={index}
                className="p-6 bg-background rounded-xl border border-border"
              >
                <h3 className="text-lg font-semibold mb-2 text-accent">
                  {(principle as { statement: string }).statement}
                </h3>
                <p className="text-sm text-foreground/70">
                  {(principle as { context: string }).context}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
