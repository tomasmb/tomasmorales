'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Users, GraduationCap, Database, Compass } from 'lucide-react';

const cardIcons = [Users, GraduationCap, Database, Compass];

const cardColors = [
  'border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400',
  'border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400',
  'border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400',
  'border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400',
];

export function Now() {
  const t = useTranslations('now');
  const cards = JSON.parse(JSON.stringify(t.raw('cards')));

  return (
    <section id="now" className="py-20 bg-foreground/[0.02]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-foreground/70 text-center mb-14 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {cards.map(
              (card: { label: string; description: string }, i: number) => {
                const Icon = cardIcons[i];
                const colorClasses = cardColors[i];
                const [borderColor, ...restColors] = colorClasses.split(' ');

                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className={`flex gap-4 p-6 bg-background border-2 ${borderColor} rounded-xl`}
                  >
                    <div className="shrink-0">
                      <div className={`p-3 rounded-lg ${restColors.join(' ')}`}>
                        <Icon size={28} />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        {card.label}
                      </h3>
                      <p className="text-sm text-foreground/70 leading-relaxed">
                        {card.description}
                      </p>
                    </div>
                  </motion.div>
                );
              }
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
