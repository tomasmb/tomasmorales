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
      color: 'bg-blue-50 border-blue-200 hover:border-blue-400',
      iconColor: 'text-blue-600',
    },
    {
      icon: ShoppingBag,
      name: t('retail.name'),
      description: t('retail.description'),
      projects: t('retail.projects'),
      color: 'bg-purple-50 border-purple-200 hover:border-purple-400',
      iconColor: 'text-purple-600',
    },
    {
      icon: TrendingUp,
      name: t('fintech.name'),
      description: t('fintech.description'),
      projects: t('fintech.projects'),
      color: 'bg-green-50 border-green-200 hover:border-green-400',
      iconColor: 'text-green-600',
    },
    {
      icon: Home,
      name: t('realestate.name'),
      description: t('realestate.description'),
      projects: t('realestate.projects'),
      color: 'bg-orange-50 border-orange-200 hover:border-orange-400',
      iconColor: 'text-orange-600',
    },
    {
      icon: Building2,
      name: t('government.name'),
      description: t('government.description'),
      projects: t('government.projects'),
      color: 'bg-gray-50 border-gray-200 hover:border-gray-400',
      iconColor: 'text-gray-600',
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
                className={`p-6 bg-white border-2 rounded-xl transition-all hover:shadow-lg ${industry.color}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`p-3 rounded-lg ${industry.iconColor} bg-white`}
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
