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
                      <h3 className="text-xl font-semibold mb-2">
                        {projectData.title}
                      </h3>
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

                    {projectData.links && projectData.links.length > 0 && (
                      <div className="flex gap-3 mt-4 pt-4 border-t border-border">
                        {projectData.links.map((link, i) => (
                          <a
                            key={i}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent/80 transition-colors"
                          >
                            {link.label}
                            <ExternalLink size={14} />
                          </a>
                        ))}
                      </div>
                    )}
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
