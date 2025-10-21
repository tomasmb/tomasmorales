'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion } from 'framer-motion';

export function Testimonials() {
  const t = useTranslations('testimonials');
  const testimonials = JSON.parse(JSON.stringify(t.raw('items')));

  return (
    <section id="testimonials" className="py-20 bg-accent/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            {t('title')}
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial: never, index: number) => {
              const data = testimonial as {
                name: string;
                title: string;
                relationship: string;
                image: string;
                quote: string;
              };

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-background rounded-2xl p-8 border border-border shadow-sm"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={data.image}
                        alt={data.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{data.name}</h3>
                      <p className="text-sm text-foreground/70">{data.title}</p>
                      <p className="text-xs text-foreground/50 mt-1">
                        {data.relationship}
                      </p>
                    </div>
                  </div>

                  <p className="text-foreground/80 italic leading-relaxed">
                    &ldquo;{data.quote}&rdquo;
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
