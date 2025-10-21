'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export function Blog() {
  const t = useTranslations('blog');
  const posts = JSON.parse(JSON.stringify(t.raw('posts')));

  return (
    <section id="blog" className="py-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('title')}</h2>
          <p className="text-lg text-foreground/70 mb-12">{t('intro')}</p>

          <div className="space-y-6">
            {posts.map((post: never, index: number) => {
              const postData = post as {
                title: string;
                excerpt: string;
                date: string;
                url?: string;
              };
              const content = (
                <div className="p-6 border border-border rounded-xl hover:border-accent transition-colors cursor-pointer">
                  <h3 className="text-xl font-semibold mb-2">
                    {postData.title}
                  </h3>
                  <p className="text-foreground/70 mb-3">{postData.excerpt}</p>
                  <p className="text-sm text-foreground/50">{postData.date}</p>
                </div>
              );

              return postData.url ? (
                <a
                  key={index}
                  href={postData.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  {content}
                </a>
              ) : (
                <div key={index}>{content}</div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
