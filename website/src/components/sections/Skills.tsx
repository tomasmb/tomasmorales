'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { skills } from '@/lib/constants/skills';
import { TechLogo } from '@/components/ui/TechLogo';

export function Skills() {
  const t = useTranslations('skills');

  return (
    <section className="py-20 bg-background overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          {t('title')}
        </h2>

        <div className="relative">
          <div className="flex overflow-x-hidden py-12">
            <motion.div
              className="flex gap-8"
              animate={{
                x: [0, -1920],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: 'loop',
                  duration: 30,
                  ease: 'linear',
                },
              }}
            >
              {[...skills, ...skills, ...skills].map((skill, index) => (
                <div
                  key={`${skill.name}-${index}`}
                  className="flex-shrink-0 flex flex-col items-center justify-center gap-3 w-40 h-40 bg-gradient-to-br from-white to-gray-50 border-2 border-border rounded-2xl hover:shadow-xl hover:scale-105 hover:border-accent/30 transition-all p-4"
                >
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <TechLogo name={skill.name} className="w-12 h-12" />
                  </div>
                  <span className="text-sm font-semibold text-center text-foreground">
                    {skill.displayName}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
