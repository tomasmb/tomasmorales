'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { skills } from '@/lib/constants/skills';
import { TechLogo } from '@/components/ui/TechLogo';

function SkillCard({ skill }: { skill: (typeof skills)[number] }) {
  return (
    <div className="flex-shrink-0 flex flex-col items-center justify-center gap-3 w-40 h-40 bg-gradient-to-br from-background to-muted/50 border-2 border-border rounded-2xl hover:shadow-xl hover:scale-105 hover:border-accent/30 transition-all p-4">
      <div className="p-2 bg-background rounded-lg shadow-sm border border-border/50">
        <TechLogo name={skill.name} className="w-12 h-12" />
      </div>
      <span className="text-sm font-semibold text-center text-foreground">
        {skill.displayName}
      </span>
    </div>
  );
}

export function Skills() {
  const t = useTranslations('skills');

  return (
    <section className="py-20 bg-background overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {t('title')}
        </motion.h2>

        <div className="relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          <div className="flex overflow-hidden py-12">
            <div className="flex gap-8 animate-scroll">
              {skills.map((skill, i) => (
                <SkillCard key={`a-${i}`} skill={skill} />
              ))}
              {skills.map((skill, i) => (
                <SkillCard key={`b-${i}`} skill={skill} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
