'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Linkedin, Github, Mail } from 'lucide-react';

export function Hero() {
  const t = useTranslations('hero');

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  return (
    <section id="home" className="min-h-screen flex items-center pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div {...fadeIn}>
            <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto">
              <Image
                src="/tomas_web.webp"
                alt="Tomas Morales"
                fill
                className="rounded-2xl object-cover object-[center_20%] transition-all hover:scale-105"
                priority
              />
            </div>
          </motion.div>

          <motion.div
            {...fadeIn}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              {t('title')}
            </h1>
            <p className="text-lg md:text-xl text-foreground/80">
              {t('subtitle')}
            </p>

            <div className="flex flex-wrap gap-3">
              {[t('tag1'), t('tag2'), t('tag3')].map((tag, i) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex gap-4 pt-4">
              <a
                href="https://www.linkedin.com/in/tomasmb1"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-foreground/5 hover:bg-foreground/10 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://github.com/tomasmb"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-foreground/5 hover:bg-foreground/10 transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="mailto:tomas.morales.ber@gmail.com"
                className="p-3 rounded-full bg-foreground/5 hover:bg-foreground/10 transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
