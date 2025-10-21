'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function ProjectsPreview() {
  const t = useTranslations('projects');
  const projects = JSON.parse(JSON.stringify(t.raw('items')));

  return (
    <section id="projects" className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('title')}</h2>
          <p className="text-lg text-foreground/70 mb-12 max-w-3xl">
            {t('subtitle')}
          </p>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project: never, index: number) => {
              const projectData = project as {
                slug: string;
                title: string;
                period?: string;
                summary?: string;
                tech: string[];
              };

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    href={`/projects/${projectData.slug}`}
                    className="block group h-full"
                  >
                    <div className="h-full p-6 border border-border rounded-xl hover:border-accent transition-all duration-300 bg-background/50 backdrop-blur-sm">
                      <div className="mb-4">
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
                          {projectData.title}
                        </h3>
                        {projectData.period && (
                          <p className="text-sm text-foreground/50 mb-3">
                            {projectData.period}
                          </p>
                        )}
                        {projectData.summary && (
                          <p className="text-foreground/70 leading-relaxed mb-4 line-clamp-3">
                            {projectData.summary}
                          </p>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {projectData.tech.slice(0, 3).map((tech, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 text-xs font-medium bg-accent/10 text-accent rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                        {projectData.tech.length > 3 && (
                          <span className="px-2 py-1 text-xs font-medium text-foreground/50">
                            +{projectData.tech.length - 3}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center text-sm text-accent font-medium group-hover:gap-2 transition-all">
                        <span>View details</span>
                        <ArrowRight
                          size={16}
                          className="group-hover:translate-x-1 transition-transform"
                        />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
