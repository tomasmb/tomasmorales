import { Navigation } from '@/components/ui/Navigation';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Experience } from '@/components/sections/Experience';
import { Skills } from '@/components/sections/Skills';
import { Industries } from '@/components/sections/Industries';
import { Blog } from '@/components/sections/Blog';
import { Beliefs } from '@/components/sections/Beliefs';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/ui/Footer';
import { features } from '@/lib/constants/features';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Industries />
        {features.blog && <Blog />}
        <Beliefs />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
