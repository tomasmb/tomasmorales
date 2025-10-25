'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  TrendingUp,
  Home,
  ShoppingBag,
  Building2,
} from 'lucide-react';

export function Industries() {
  const t = useTranslations('industries');

  const industries = [
    {
      icon: GraduationCap,
      name: t('edtech.name'),
      description: t('edtech.description'),
      projects: t('edtech.projects'),
      color: 'border-blue-200 dark:border-blue-800 hover:border-blue-400 dark:hover:border-blue-600',
      iconBg: 'bg-blue-50 dark:bg-blue-950/30',
      iconColor: 'text-blue-600 dark:text-blue-400',
    },
    {
      icon: ShoppingBag,
      name: t('retail.name'),
      description: t('retail.description'),
      projects: t('retail.projects'),
      color: 'border-purple-200 dark:border-purple-800 hover:border-purple-400 dark:hover:border-purple-600',
      iconBg: 'bg-purple-50 dark:bg-purple-950/30',
      iconColor: 'text-purple-600 dark:text-purple-400',
    },
    {
      icon: TrendingUp,
      name: t('fintech.name'),
      description: t('fintech.description'),
      projects: t('fintech.projects'),
      color: 'border-green-200 dark:border-green-800 hover:border-green-400 dark:hover:border-green-600',
      iconBg: 'bg-green-50 dark:bg-green-950/30',
      iconColor: 'text-green-600 dark:text-green-400',
    },
    {
      icon: Home,
      name: t('realestate.name'),
      description: t('realestate.description'),
      projects: t('realestate.projects'),
      color: 'border-orange-200 dark:border-orange-800 hover:border-orange-400 dark:hover:border-orange-600',
      iconBg: 'bg-orange-50 dark:bg-orange-950/30',
      iconColor: 'text-orange-600 dark:text-orange-400',
    },
    {
      icon: Building2,
      name: t('government.name'),
      description: t('government.description'),
      projects: t('government.projects'),
      color: 'border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600',
      iconBg: 'bg-gray-50 dark:bg-gray-900/30',
      iconColor: 'text-gray-600 dark:text-gray-400',
    },
  ];

  return (
    <section className="py-20 bg-foreground/[0.02]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            {t('title')}
          </h2>
          <p className="text-center text-foreground/70 mb-12 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`p-6 bg-background border-2 rounded-xl transition-all hover:shadow-lg ${industry.color}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`p-3 rounded-lg ${industry.iconColor} ${industry.iconBg}`}
                  >
                    <industry.icon size={24} />
                  </div>
                  <h3 className="text-xl font-semibold">{industry.name}</h3>
                </div>
                <p className="text-foreground/70 mb-3 text-sm">
                  {industry.description}
                </p>
                <div className="text-sm">
                  <span className="font-semibold text-foreground/90">
                    Projects:{' '}
                  </span>
                  <span className="text-foreground/70">
                    {industry.projects}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
