'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, ExternalLink } from 'lucide-react';

export function Contact() {
  const t = useTranslations('contact');

  const links = [
    {
      icon: Mail,
      label: 'Email',
      value: t('email'),
      href: `mailto:${t('email')}`,
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: t('linkedin'),
      href: `https://${t('linkedin')}`,
    },
    {
      icon: Github,
      label: 'GitHub',
      value: t('github'),
      href: `https://${t('github')}`,
    },
  ];

  return (
    <section id="contact" className="py-20 bg-foreground/[0.02]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12">{t('title')}</h2>

          <div className="space-y-4 max-w-2xl mx-auto">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target={link.icon !== Mail ? '_blank' : undefined}
                rel={link.icon !== Mail ? 'noopener noreferrer' : undefined}
                className="flex items-center justify-between p-6 bg-foreground/5 rounded-xl hover:bg-foreground/10 transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <link.icon className="text-accent" size={24} />
                  <div className="text-left">
                    <p className="text-sm text-foreground/50">{link.label}</p>
                    <p className="font-medium">{link.value}</p>
                  </div>
                </div>
                <ExternalLink
                  className="text-foreground/30 group-hover:text-foreground/50 transition-colors"
                  size={20}
                />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
