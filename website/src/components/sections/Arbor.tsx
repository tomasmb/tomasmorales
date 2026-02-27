'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowRight, ClipboardCheck, Route, Brain, Trophy } from 'lucide-react';

const stepIcons = [ClipboardCheck, Route, Brain, Trophy];

const stepColors = [
  'border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400',
  'border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400',
  'border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400',
  'border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400',
];

export function Arbor() {
  const t = useTranslations('arbor');
  const steps = JSON.parse(JSON.stringify(t.raw('steps')));
  const metrics = JSON.parse(JSON.stringify(t.raw('metrics')));

  return (
    <section id="arbor" className="py-20 bg-foreground/[0.02]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-foreground/70 text-center mb-14 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>

          <div className="grid md:grid-cols-4 gap-6 mb-16">
            {steps.map((step: { label: string; description: string }, i: number) => {
              const Icon = stepIcons[i];
              const colorClasses = stepColors[i];
              const [borderColor, ...restColors] = colorClasses.split(' ');

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`relative p-6 bg-background border-2 ${borderColor} rounded-xl text-center`}
                >
                  <div className="flex justify-center mb-4">
                    <div className={`p-3 rounded-lg ${restColors.join(' ')}`}>
                      <Icon size={28} />
                    </div>
                  </div>
                  <div className="text-xs font-bold text-foreground/40 mb-2">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{step.label}</h3>
                  <p className="text-sm text-foreground/70 leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {metrics.map((metric: { value: string; label: string }, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <p className="text-4xl md:text-5xl font-bold text-accent mb-2">
                  {metric.value}
                </p>
                <p className="text-sm text-foreground/70">{metric.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <a
              href="https://preu.arbor.school"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white rounded-xl hover:bg-accent/90 transition-colors font-medium text-lg"
            >
              {t('cta')}
              <ArrowRight size={20} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
