import { Navigation } from '@/components/ui/Navigation';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Arbor } from '@/components/sections/Arbor';
import { Testimonials } from '@/components/sections/Testimonials';
import { Experience } from '@/components/sections/Experience';
import { Skills } from '@/components/sections/Skills';
import { Blog } from '@/components/sections/Blog';
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
        <Arbor />
        <Testimonials />
        <Experience />
        <Skills />
        {features.blog && <Blog />}
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
