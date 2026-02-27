'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

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
                links?: { label: string; url: string }[];
              };

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="h-full"
                >
                  <div className="h-full p-6 border border-border rounded-xl bg-background/50 backdrop-blur-sm">
                    <div className="mb-4">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="text-xl font-semibold">
                          {projectData.title}
                        </h3>
                        {projectData.links && projectData.links.length > 0 && (
                          <a
                            href={projectData.links[0].url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 shrink-0 px-2.5 py-1 text-xs font-medium text-accent border border-accent/30 rounded-full hover:bg-accent/10 transition-colors"
                          >
                            {projectData.links[0].label}
                            <ExternalLink size={12} />
                          </a>
                        )}
                      </div>
                      {projectData.period && (
                        <p className="text-sm text-foreground/50 mb-3">
                          {projectData.period}
                        </p>
                      )}
                      {projectData.summary && (
                        <p className="text-foreground/70 leading-relaxed mb-4">
                          {projectData.summary}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2">
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

                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
