'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, ChevronUp, Download } from 'lucide-react';

interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
  tech: string;
  isCurrent: boolean;
}

export function Experience() {
  const t = useTranslations('experience');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const experiences: ExperienceItem[] = [
    {
      company: t('current.company'),
      role: t('current.role'),
      period: t('current.period'),
      location: t('current.location'),
      description: t('current.description'),
      highlights: JSON.parse(
        JSON.stringify(t.raw('current.highlights'))
      ) as string[],
      tech: t('current.tech'),
      isCurrent: true,
    },
    ...JSON.parse(JSON.stringify(t.raw('past'))).map(
      (exp: Omit<ExperienceItem, 'isCurrent'>) => ({
        ...exp,
        isCurrent: false,
      })
    ),
  ];

  return (
    <section id="experience" className="py-20 bg-foreground/[0.02]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold">{t('title')}</h2>
            <a
              href="/cv_tomas_morales.pdf"
              className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors text-sm"
            >
              <Download size={16} />
              {t('downloadCV')}
            </a>
          </div>

          <div className="space-y-4">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="border border-border rounded-xl overflow-hidden bg-background"
              >
                <button
                  onClick={() =>
                    setExpandedIndex(expandedIndex === index ? null : index)
                  }
                  className="w-full p-6 text-left hover:bg-foreground/[0.02] transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-semibold">{exp.company}</h3>
                        {exp.isCurrent && (
                          <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full">
                            Current
                          </span>
                        )}
                      </div>
                      <p className="text-foreground/70 mb-1">{exp.role}</p>
                      <p className="text-sm text-foreground/50">
                        {exp.period} · {exp.location}
                      </p>
                    </div>
                    {expandedIndex === index ? (
                      <ChevronUp className="text-foreground/50" />
                    ) : (
                      <ChevronDown className="text-foreground/50" />
                    )}
                  </div>
                </button>

                {expandedIndex === index && (
                  <div className="px-6 pb-6 space-y-4">
                    <p className="text-foreground/80">{exp.description}</p>
                    <div>
                      <p className="font-semibold mb-2">Highlights</p>
                      <ul className="space-y-2">
                        {exp.highlights.map((highlight: string, i: number) => (
                          <li
                            key={i}
                            className="flex gap-2 text-sm text-foreground/70"
                          >
                            <span className="text-accent mt-1">•</span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm text-foreground/50">
                        <span className="font-semibold">Tech:</span> {exp.tech}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
